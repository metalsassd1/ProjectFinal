import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MuiInput } from "../../components/MuiInput";
import {
  Box,
  Button,
  ThemeProvider,
  createTheme,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { FormOptions } from "./components/FormOptions";
import { MuiDateRangePicker } from "../../components/MuiDateRangePicker";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // Green
    },
    background: {
      default: "#ffffff", // White
      paper: "#f1f5f9", // Light gray for form background
    },
  },
});

const schema = z.object({
  borrower_name: z.string().min(1, { message: "โปรดกรอกชื่อผู้ยืม" }),
  options: z.enum(["inside", "outside", "student"]),
  identifier_number: z
    .string()
    .min(1, { message: "โปรดกรอกหมายเลขบัตรประชาชน / รหัสนักศึกษา" }),
  department: z.string().min(1, { message: "โปรดกรอกสาขา" }).nullable(),
  branch: z.string().min(1, { message: "โปรดกรอกสาขา" }).nullable(),
  faculty: z.string().min(1, { message: "โปรดกรอกคณะ" }).nullable(),
  phone: z
    .string()
    .regex(/^(08|09|06)\d{8}$/, { message: "โปรดกรอกเบอร์โทรให้ถูกต้อง" }),
  email: z.string().email({ message: "โปรดกรอกอีเมลให้ถูกต้อง" }),
  backup_phone: z
    .string()
    .regex(/^(08|09|06)\d{8}$/, { message: "โปรดกรอกเบอร์โทรให้ถูกต้อง" })
    .optional(),
  backup_email: z
    .string()
    .email({ message: "โปรดกรอกอีเมลให้ถูกต้อง" })
    .optional(),
  duration: z.object({ start: z.coerce.date(), end: z.coerce.date() }),
});

export default function Borrower() {
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [user, setUser] = useState("");
  const [userEmails, setUserEmails] = useState([]);
  const navigate = useNavigate();
  const [option, setOption] = useState("");
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || [];
  const isMultipleItems = selectedItems.length > 1;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      borrower_name: "",
      equip_name: selectedItems.map(item => item.equipment_name).join(', '),
      identifier_number: "",
      phone: "",
      quantity_borrowed: selectedItems.reduce((total, item) => total + item.desired_quantity, 0),
      duration: "",
    },
  });
  
  const id = Math.floor(Math.random() * 1000000);

  // console.log(userEmails);
  useEffect(() => {
    const fetchAdminUser = async () => {
      try {
        const response = await axios.get(
          "https://back-end-finals-project-vibo.onrender.com/api/user/table"
        );
        if (response.data && Array.isArray(response.data)) {
          setUser(response.data);
        } else {
          console.error("Invalid data format received for admin users");
          setUser([]);
        }
      } catch (error) {
        console.error("Failed to fetch admin user:", error);
        setUser([]);
      }
    };

    fetchAdminUser();
  }, []);

  useEffect(() => {
    if (Array.isArray(user) && user.length > 0) {
      const emailArray = user.filter((u) => u.email).map((u) => u.email);
      setUserEmails(emailArray);
    } else {
      setUserEmails([]);
    }
  }, [user]);

  const translateOptionToThai = (option) => {
    const optionMap = {
      inside: "บุคลากรภายใน",
      outside: "บุคคลภายนอก",
      student: "นักศึกษา",
    };
    return optionMap[option] || option;
  };

  const onSubmit = async (data) => {
    if (isMultipleItems) {
      await handleMultipleItemSubmit(data);
      console.log("handleMultipleItemSubmit");
    } else {
      await handleSingleItemSubmit(data);
      console.log("handleSingleItemSubmit");
    }
  };

  function formatDate(date) {
    const dateObject = date instanceof Date ? date : new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleSingleItemSubmit = async (data) => {
    const formattedData = {
      id: id,
      borrower_name: data.borrower_name,
      identifier_number:
        data.identifier_number.length > 10 ? null : data.identifier_number,
      contact: {
        phone: data.phone,
        email: data.email,
        backup_phone: data.backup_phone,
        backup_email: data.backup_email,
      },
      department: data.department,
      branch: data.branch,
      faculty: data.faculty,
      options: translateOptionToThai(data.options),
      borrow_date: formatDate(data.duration.start, true),
      return_date: formatDate(data.duration.end, true),
      loan_status: "รออนุมัติ",
      items: [
        {
          equipment_name: selectedItems[0].equipment_name,
          equipment_type: selectedItems[0].equipment_type,
          quantity_borrowed: selectedItems[0].desired_quantity,
        }
      ],
    };
  
    console.log(formattedData);
    const submitEv = `https://pimcantake.netlify.app/admin-login/?data=${encodeURIComponent(
      JSON.stringify(formattedData)
    )}`;
  
    try {
      const response = await axios.post(
        "https://back-end-finals-project-vibo.onrender.com/api/Borrowed/borrow",
        formattedData
      );

      handleAdminsubmit(formattedData, submitEv).then(() => {
        if (response) {
          swal({
            title: "ดำเนินการสำเร็จ",
            text: "กรุณารอผู้ดูแลอนุมัติ!",
            icon: "success",
            button: "OK",
          }).then(() => {
            navigate(
              `/qr?data=${encodeURIComponent(JSON.stringify(formattedData))}`
            );
          });
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      swal({
        title: "Error",
        text: "An error occurred while submitting the form.",
        icon: "error",
        button: "OK",
      });
    }
  };

  const handleMultipleItemSubmit = async (data) => {
    const loanId = Math.floor(Math.random() * 1000000);
    const formattedData = {
      id: loanId,
      borrower_name: data.borrower_name,
      identifier_number: data.identifier_number.length > 10 ? null : data.identifier_number,
      borrow_date: formatDate(data.duration.start),
      return_date: formatDate(data.duration.end),
      loan_status: "รออนุมัติ",
      contact: {
        phone: data.phone,
        email: data.email,
        backup_phone: data.backup_phone,
        backup_email: data.backup_email,
      },
      department: data.department,
      branch: data.branch,
      faculty: data.faculty,
      options: translateOptionToThai(data.options),
      items: selectedItems.map((item) => ({
        equipment_name: item.equipment_name,
        equipment_type: item.equipment_type,
        quantity_borrowed: item.desired_quantity,
      })),
    };
  
    console.log(formattedData);
  
    try {
      const response = await axios.post(
        "https://back-end-finals-project-vibo.onrender.com/api/Borrowed/borrow-multiple",
        formattedData
      );
  
      const submitEv = `https://pimcantake.netlify.app/admin-login/?data=${encodeURIComponent(
        JSON.stringify(formattedData)
      )}`;
  
      await handleAdminsubmit(formattedData, submitEv);
  
      if (response) {
        swal({
          title: "ดำเนินการสำเร็จ",
          text: "กรุณารอผู้ดูแลอนุมัติ!",
          icon: "success",
          button: "OK",
        }).then(() => {
          navigate(
            `/qr?data=${encodeURIComponent(JSON.stringify(formattedData))}`
          );
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      swal({
        title: "Error",
        text: "An error occurred while submitting the form.",
        icon: "error",
        button: "OK",
      });
    }
  };
  
  const handleAdminsubmit = async (formattedData, submitEv) => {
    const service = "service_2kcoyx1";
    const publicK = "_6kKCdpsY-m47jeg-";
    const template = "template_k1dp1dm";
    
    if (userEmails.length === 0) {
      console.error("No recipient email addresses found");
      throw new Error("No recipient email addresses");
    }
    
    const emailAddresses = userEmails.join(", ");
    
    // แปลงรายการอุปกรณ์เป็นสตริง
    const itemsList = formattedData.items.map(item => 
      `${item.equipment_name || 'N/A'} (${item.equipment_type || 'N/A'}): ${item.quantity_borrowed || 0} ชิ้น`
    ).join(', ');
  
    // สร้างฟังก์ชันช่วยในการจัดการค่า undefined หรือ null
    const safeString = (value) => value ? String(value) : '';
    

    const formatDateThai = (dateString) => {
      if (!dateString) return "No date provided";
      const date = new Date(dateString);
      if (isNaN(date)) return "Invalid date";
      return date.toLocaleDateString("TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    
    const templateParams = {
      id:formattedData.id,
      to_email: emailAddresses,
      submitEv: safeString(submitEv),
      borrower_name: safeString(formattedData.borrower_name),
      identifier_number: safeString(formattedData.identifier_number),
      borrow_date: formatDateThai(formattedData.borrow_date),
      return_date: formatDateThai(formattedData.return_date),
      items_list: itemsList,
      contact_phone: safeString(formattedData.contact?.phone),
      contact_email: safeString(formattedData.contact?.email),
      options: safeString(formattedData.options),
    };
  
    // เพิ่มข้อมูลสำรองเฉพาะเมื่อมีค่า
    if (formattedData.contact?.backup_phone) {
      templateParams.backup_phone = safeString(formattedData.contact.backup_phone);
    }
    if (formattedData.contact?.backup_email) {
      templateParams.backup_email = safeString(formattedData.contact.backup_email);
    }
  
    console.log("Template Params:", templateParams);  // เพิ่ม log เพื่อตรวจสอบข้อมูล
  
    try {
      const result = await emailjs.send(
        service,
        template,
        templateParams,
        publicK
      );
      console.log("EmailJS result:", result);  // เพิ่ม log เพื่อตรวจสอบผลลัพธ์
      setApprovalStatus(result.text === "OK" ? "success" : "failure");
      return Promise.resolve();
    } catch (error) {
      console.error("EmailJS error:", error);  // เปลี่ยนเป็น console.error
      setApprovalStatus("failure");
      return Promise.reject(error);
    }
  };

  function renderOrganize() {
    switch (option) {
      case "inside":
        return (
          <Box
            display={"flex"}
            gap={1}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <MuiInput
              control={form.control}
              name={"identifier_number"}
              label={"รหัสพนักงาน / รหัสบัตรประชาชน"}
              required={true}
            />
            <MuiInput
              control={form.control}
              name={"department"}
              label={"หน่วยงาน"}
              required={true}
            />
          </Box>
        );
      case "outside":
        return (
          <Box
            display={"flex"}
            flexDirection={{ xs: "column", sm: "row" }}
            gap={1}
          >
            <MuiInput
              control={form.control}
              name={"identifier_number"}
              label={"รหัสบัตรประชาชน"}
              required={true}
            />
            <MuiInput
              control={form.control}
              name={"department"}
              label={"หน่วยงาน"}
              required={true}
            />
          </Box>
        );
      case "student":
        return (
          <>
            <MuiInput
              control={form.control}
              name={"identifier_number"}
              label={"รหัสนักศึกษา / รหัสบัตรประชาชน"}
              required={true}
            />
            <Box
              display={"flex"}
              flexDirection={{ xs: "column", sm: "row" }}
              gap={1}
            >
              <MuiInput
                control={form.control}
                name={"branch"}
                label={"สาขา"}
                required={true}
              />
              <MuiInput
                control={form.control}
                name={"faculty"}
                label={"คณะ"}
                required={true}
              />
            </Box>
          </>
        );
      default:
        return (
          <Box display={"flex"} gap={1}>
            <MuiInput
              control={form.control}
              name={"identifier_number"}
              label={"รหัสบัตรประชาชน"}
              required={true}
            />
            <MuiInput
              control={form.control}
              name={"department"}
              label={"หน่วยงาน"}
              required={true}
            />
          </Box>
        );
    }
  }
  useEffect(() => {
    const op = form.getValues("options");
    if (op === "inside" || op === "outside") {
      form.setValue("department", "", { shouldValidate: true });
      form.setValue("faculty", null);
      form.setValue("branch", null);
    }
    if (op === "student") {
      form.setValue("faculty", "", { shouldValidate: true });
      form.setValue("branch", "", { shouldValidate: true });

      form.setValue("department", null);
    }
  }, [form.watch("options")]);
  useEffect(() => {
    const v = form.getValues("options");
    if (v) {
      setOption(v);
    }
  }, [form.watch("options")]);
  useEffect(() => {
    if (form.formState.errors) {
      console.log(form.formState.errors);
    }
  }, [form.formState.errors]);
  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          style={{ width: "100%", maxWidth: "600px", padding: "0 10px" }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="100%"
            gap="1rem"
          >
            <Box
              width="95%"
              bgcolor="#f1f5f9"
              sx={{ padding: 2, borderRadius: 1, marginBottom: 2 }}
            >
              <Typography variant="h6" gutterBottom>
                รายการอุปกรณ์ที่ต้องการยืม
              </Typography>
              <Divider sx={{ my: 1 }} />
              <List disablePadding>
                {selectedItems.map((item, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemText
                      primary={item.equipment_name}
                      secondary={`ประเภท: ${item.equipment_type}`}
                    />
                    <ListItemText
                      secondary={`จำนวน: ${item.desired_quantity}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <MuiDateRangePicker
              control={form.control}
              name={"duration"}
              alert={
                form.formState.isSubmitted &&
                (!form.getValues("duration.start") ||
                  !form.getValues("duration.end"))
                  ? true
                  : false
              }
            />
            <Box
              width={"95%"}
              bgcolor={"#f1f5f9"}
              sx={{ padding: 2 }}
              display={"grid"}
              gap={"1rem"}
            >
              <Box width="100%">
                <MuiInput
                  control={form.control}
                  name={"borrower_name"}
                  label={"ชื่อ - นามสกุล"}
                  fullWidth
                  required={true}
                />
              </Box>
              <FormOptions
                control={form.control}
                name={"options"}
                alert={
                  form.formState.isSubmitted && !form.getValues("options")
                    ? true
                    : false
                }
              />
              {option && renderOrganize()}
              <Box
                display={"flex"}
                flexDirection={{ xs: "column", sm: "row" }} // Flex direction changes on small screens
                gap={{ xs: 1, sm: 1 }} // No gap on small screens, 1rem gap on larger screens
                width={"100%"}
              >
                <MuiInput
                  control={form.control}
                  name={"email"}
                  label={"อีเมล"}
                  required={true}
                />
                <MuiInput
                  control={form.control}
                  name={"phone"}
                  label={"เบอร์โทรศัพท์"}
                  required={true}
                />
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={{ xs: "column", sm: "row" }} // Flex direction changes on small screens
              gap={{ xs: 1, sm: 1 }} // No gap on small screens, 1rem gap on larger screens
              width={"100%"}
            >
              <MuiInput
                control={form.control}
                name={"backup_email"}
                label={"อีเมลสำรอง (ไม่บังคับ)"}
              />
              <MuiInput
                control={form.control}
                name={"backup_phone"}
                label={"เบอร์โทรศัพท์สำรอง (ไม่บังคับ)"}
              />
            </Box>
            <Button variant="contained" type="submit" fullWidth>
              ส่งคำขอ
            </Button>
          </Box>
        </form>
      </Box>
    </ThemeProvider>
  );
}
