import React, { useState } from "react";
import emailjs from "emailjs-com";
import { TextField, Button, Box, Container, Grid } from "@mui/material";
import Swal from 'sweetalert2';
import "./Css.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [senderID, setSenderID] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [to,setTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const service = "service_2kcoyx1";
    const publicK = "_6kKCdpsY-m47jeg-";
    const template = "template_jyc9mx3";

    const templateParams = {
      senderID,
      name,
      status,
      message,
      phoneNumber,
      to,
    };

    emailjs.send(service, template, templateParams, publicK).then(
      (result) => {
        console.log(result.text);
        Swal.fire({
          icon: 'success',
          title: 'ส่งข้อมูลสำเร็จ',
          text: 'รับแจ้งปัญหา',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#4CAF50',
        });
        // Reset form fields after successful submission
        setName("");
        setSenderID("");
        setStatus("");
        setMessage("");
        setPhoneNumber("");
        setTo("");
      },
      (error) => {
        console.log(error.text);
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#4CAF50',
        });
      }
    );
  };

  return (
    <Container className="contact-form">
      <h1>แบบฟอร์มการแจ้งปัญหา</h1>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="ชื่อผู้ส่ง"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="รหัสประจำตัว"
              name="senderID"
              value={senderID}
              onChange={(e) => setSenderID(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="อีเมล"
              name="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="สถานะ"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
              margin="normal"
              required
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
              required
            />
            <TextField
              label="เบอร์โทรศัพท์"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              margin="normal"
              required
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