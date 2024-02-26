import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { TextField, Button, Box, Container, Grid } from "@mui/material";
import "./Css.css"; // ตรวจสอบให้แน่ใจว่าชื่อไฟล์ CSS ถูกต้อง

const ContactForm = () => {
 

  const [senderName, setSenderName] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [to, setTo] = useState("metharaengein@gmail.com");

  const handleSubmit = (e) => {
      e.preventDefault();
      const service = "service_2vntdka";
      const publicK = "_6kKCdpsY-m47jeg-"
      const template = "template_jyc9mx3"
    
      const templateParams = {
        senderName: senderName,
        status: status,
        message: message,
        phoneNumber : phoneNumber,
        to:to
      }
    emailjs
      .send(
        service,
        template,
        templateParams,
        publicK
      )
      .then(
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

  console.log({
    senderName,
    status,
    message,
    phoneNumber,
    to,
  });

  return (
    <Container className="contact-form">
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="ชื่อผู้ส่ง"
              name="senderName"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
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
            <TextField
              label="ที่อยู่อีเมลผู้รับ"
              name="to_email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
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
