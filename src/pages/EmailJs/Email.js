import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { TextField, Button, Box, Container, Grid } from "@mui/material";
import MultipleSelectCheckmarks from "../../components/dropdown";
import "./Css.css"; // ตรวจสอบให้แน่ใจว่าชื่อไฟล์ CSS ถูกต้อง
import { Person, Subject } from "@mui/icons-material";

const ContactForm = () => {
  const names = ["อุบัติเหตุ", "ปัญหาการใช้สนาม", "อื่นๆ"];

  const [name, setName] = useState("");
  const [senderID, setsenderID] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [to, setTo] = useState("metharaengein@gmail.com");
  const [subject, setSubject] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const service = "service_2vntdka";
    const publicK = "_6kKCdpsY-m47jeg-";
    const template = "template_jyc9mx3";

    const templateParams = {
      senderID: senderID,
      name: name,
      status: status,
      message: message,
      phoneNumber: phoneNumber,
      to: to,
      subject: subject,
    };
    emailjs.send(service, template, templateParams, publicK).then(
      (result) => {
        console.log(result.text);
        // ส่วนโค้ดเพื่อจัดการหลังจากส่งอีเมลสำเร็จ
      },
      (error) => {
        console.log(error.text);
        // ส่วนโค้ดเพื่อจัดการหากเกิดข้อผิดพลาด
      }
    );
  };

  // console.log({
  //   senderID,
  //   status,
  //   message,
  //   phoneNumber,
  //   to,
  // });

  const handleChange = (selectedValues) => {
    console.log("Selected values:", selectedValues);
    setSubject(selectedValues);
  };
  return (
    <Container className="contact-form">
      <Grid container justifyContent="center">
        <h1>แบบฟอร์มการแจ้งปัญหา</h1>
        <Grid item xs={12} sm={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="ชื่อผู้ส่ง"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="รหัสประจำตัว"
              name="senderID"
              value={senderID}
              onChange={(e) => setsenderID(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="สถานะ"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
              margin="normal"
            />
            <div>
              <MultipleSelectCheckmarks
                names={names}
                onSelectionChange={handleChange}
              />
            </div>
            <TextField
              label="ข้อความ"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              label="เบอร์โทรศัพท์"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Box textAlign="center" my={2}>
              <Button type="submit" variant="contained" color="primary">
                ส่งข้อมูล
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactForm;
