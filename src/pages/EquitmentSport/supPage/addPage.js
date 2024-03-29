import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/navigatorbar";
import Navbar from "../../.././components/navbar";
import { TextField, Button, Box, Paper } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';


const Addpage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data or perform other actions if needed
      try {
        // const result = await fetchDataFromAPI();
        // setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data on mount
    fetchData();

    // Set up an interval for fetching data
    const intervalId = setInterval(fetchData, 60000); // Assuming a 1-minute interval
    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: '',
    photo: null
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle photo upload
  const handlePhotoChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      photo: e.target.files[0]
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // You would handle the form submission here
    // This could involve preparing the data and sending it to an API
    console.log(formData.field1);
  };


  return (
    <div style={{ background: "#f0f0f0" }}>
      <div className="header" style={{
          marginLeft: isSidebarOpen ? 200 : 0,
          transition: "margin 0.3s",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />
      </div>
      <div className={isSidebarOpen ? "sidebar-open" : "sidebar-closed"}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>
      <br />
      <div className="content-container" style={{
          marginLeft: isSidebarOpen ? 300 : 100,
          marginRight: isSidebarOpen ? 70 : 100,
          transition: "margin 0.3s",
        }}
      >
        <h1>เพิ่มข้อมูลอุปกรณ์กีฬา</h1>
        <Paper elevation={3} style={{ margin: '1rem', padding: '1rem' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Field 1"
              variant="outlined"
              name="field1"
              value={formData.field1}
              onChange={handleChange}
              style={{ margin: '0.5rem' }}
              fullWidth
            />
            <TextField
              label="Field 2"
              variant="outlined"
              name="field2"
              value={formData.field2}
              onChange={handleChange}
              style={{ margin: '0.5rem' }}
              fullWidth
            />
             <TextField
              label="Field 2"
              variant="outlined"
              name="field2"
              value={formData.field2}
              onChange={handleChange}
              style={{ margin: '0.5rem' }}
              fullWidth
            />
             <TextField
              label="Field 2"
              variant="outlined"
              name="field2"
              value={formData.field2}
              onChange={handleChange}
              style={{ margin: '0.5rem' }}
              fullWidth
            />
             <TextField
              label="Field 2"
              variant="outlined"
              name="field2"
              value={formData.field2}
              onChange={handleChange}
              style={{ margin: '0.5rem' }}
              fullWidth
            />
            <Box textAlign="center" my={2}>
              <Button
                variant="contained"
                component="label"
                startIcon={<AddAPhotoIcon />}
              >
                เพิ่มรูปภาพ
                <input
                  type="file"
                  hidden
                  onChange={handlePhotoChange}
                />
              </Button>
            </Box>
            {formData.photo && (
              <Box textAlign="center" my={2}>
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Uploaded"
                  style={{ maxWidth: '100%', maxHeight: '300px' }}
                />
              </Box>
            )}
            <Box textAlign="center" my={2}>
              <Button type="submit" variant="contained" color="primary">
                ส่ง
              </Button>
            </Box>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default Addpage;