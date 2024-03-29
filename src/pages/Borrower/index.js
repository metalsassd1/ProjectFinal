import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MuiInput } from "../../components/MuiInput";
import { Box, Button } from "@mui/material";
import { FormOptions } from "./components/FormOptions";
import { MuiDateRangePicker } from "../../components/MuiDateRangePicker";
import { CarTaxiFront } from "lucide-react";

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
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      borrower_name: "",
      equip_name: "",
      identify_id: "",
      phone: "",
      email: "",
    },
  });
  const [option, setOption] = useState("");
  const onSubmit = (value) => {
    console.log(value);
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
    }
  }, [form.formState.errors]);
  return (
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
          <MuiInput
            control={form.control}
            name={"equip_name"}
            label={"ชื่ออุปกรณ์"}
            fullWidth
            required={true}
          />
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
  );
}
