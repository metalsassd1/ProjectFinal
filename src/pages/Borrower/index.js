import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MuiInput } from "../../components/MuiInput";
import { Box, Button, ThemeProvider, createTheme } from "@mui/material";
import { FormOptions } from "./components/FormOptions";
import { MuiDateRangePicker } from "../../components/MuiDateRangePicker";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import swal from 'sweetalert';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green
    },
    background: {
      default: '#ffffff', // White
      paper: '#f1f5f9', // Light gray for form background
    },
  },
});

const schema = z.object({
  borrower_name: z.string().min(1, { message: "โปรดกรอกชื่อผู้ยืม" }),
  equip_name: z.string().min(1, { message: "โปรดกรอกชื่อผู้ยืม" }),
  options: z.enum(["inside", "outside", "student"]),
  identify_id: z
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
  const [quantity_borrowed, setQuantity_borrowed] = useState(1);
  const { Ename, Etype, desired_quantity } = useParams();
  const [approvalStatus, setApprovalStatus] = useState(null);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      borrower_name: "",
      equip_name: Ename,
      identify_id: "",
      phone: "",
      quantity_borrowed: desired_quantity,
      duration: "",
    },
  });
  const [option, setOption] = useState("");

  const id = Math.floor(Math.random() * 1000000);
  const onSubmit = async (data) => {
    // Formatted data object if needed, or you can directly use `data`
    const formattedData = {
      id: id,
      borrower_name: data.borrower_name,
      equipment_name: data.equip_name,
      identification_id: data.identify_id,
      quantity_borrowed: quantity_borrowed,
      contact: {
        phone: data.phone,
        email: data.email,
        backup_phone: data.backup_phone,
        backup_email: data.backup_email,
      },
      equipment_type: Etype,
      department: data.department,
      branch: data.branch,
      faculty: data.faculty,
      options: data.options,
      borrow_date: data.duration.start.toISOString().split("T")[0],
      return_date: data.duration.end.toISOString().split("T")[0],
      loan_status: "รออนุมัติ",
      quantity_data: quantity_borrowed,
      submitEv:''
    };

    formattedData.submitEv= `https://pimcantake.netlify.app/submit/data=${encodeURIComponent(JSON.stringify(formattedData))}`
 
    try {
      // Submit the borrowing request to the backend API
      const response = await axios.post("https://back-end-finals-project-pgow.onrender.com/api/Borrowed/borrow", formattedData);
      console.log("Server response:", response.data,formattedData);

      // Now handle the email submission and wait for its completion
      handleAdminsubmit(formattedData).then(() => {
        if (response) {
          swal({
            title: "ดำเนินการสำเร็จ",
            text: "กรุณารอผู้ดูแลอนุมัติ!",
            icon: "success",
            button: "OK",
          }).then(() => {
            navigate(`/qr?data=${encodeURIComponent(JSON.stringify(formattedData))}`);
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
  
  const handleAdminsubmit = async (formattedData) => {
    const service = "service_2kcoyx1";
    const publicK = "_6kKCdpsY-m47jeg-";
    const template = "template_k1dp1dm";
  
    const templateParams = { formattedData };
    try {
      const result = await emailjs.send(service, template, templateParams, publicK);
      console.log("EmailJS result:", result);
      setApprovalStatus(result.text === "OK" ? "success" : "failure"); // Assuming 'OK' is success
      return Promise.resolve();
    } catch (error) {
      console.log("EmailJS error:", error.text);
      setApprovalStatus("failure");
      return Promise.reject();
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
              name={"identify_id"}
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
              name={"identify_id"}
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
              name={"identify_id"}
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
              name={"identify_id"}
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
      console.log(Ename);
    }
  }, [form.formState.errors]);
  return (
    <ThemeProvider theme={theme}>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Changed height to minHeight for responsiveness
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        style={{ width: "100%", maxWidth: "600px", padding: "0 10px" }} // Adjusted form width and added padding
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          gap="1rem" // Changed sx gap to shorthand
        >
          <Box
            display={"flex"}
            flexDirection={{ xs: "column", sm: "row" }} // Flex direction changes on small screens
            gap={{ xs: 1, sm: 1 }} // No gap on small screens, 1rem gap on larger screens
            width={"100%"}
          >
            <MuiInput
              control={form.control}
              name={"equip_name"}
              label={"ชื่ออุปกรณ์"}
              fullWidth
              required={true}
              disabled={true}
            />
            <MuiInput
              control={form.control}
              name="quantity_borrowed"
              type="number"
              label="จำนวน"
              fullWidth
              required={true}
              disabled={true}
            />
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
