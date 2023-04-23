import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import emailList from '../../data/emaillist.json';

// Assets
import Logo1 from '../../assets/1.png';
import Logo2 from '../../assets/2.png';

// Modals
import ErrorModal from '../../models/Error';

const HomePage = ({history}) => {
    const [email, setEmail] = useState("");
    const [errorModal, setErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if(localStorage.getItem("email")){
            history.push('/submissions')
        };
    }, [])

    const handleSubmission = () => {
        // check if the entered email exists in the emailList array
        const emailExists = emailList.some((item) => item.email === email);
      
        if (emailExists) {
          localStorage.setItem("email", email);
          history.push("/submissions");
        } else {
          setErrorMessage("Invalid email address. Please try again.");
          setErrorModal(true);
        }
      };

    return (
        <Box display="grid" justifyContent="center" alignItems="center" height="100%" width="100%">
            {errorModal ? (
                <ErrorModal open={errorModal} setOpen={setErrorModal} message={errorMessage}/>
            ):""}
            <Box height="400px" width="600px" mt="200px"
            sx={{
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                cursor: "pointer",
                borderRadius: 1,
                padding: "20px",
                border: "1px solid #D3D3D3",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.35)"
                }
            }}>
                <Box display="flex" justifyContent="space-between">
                    <img src={Logo1} alt="logo-1" height={90}/>
                    <img src={Logo2} alt="logo-1" height={90}/>
                </Box>

                <Box>
                    <Typography mt="40px">
                    Welcome to the Compensation Funds Employer Verification admin portal. To begin, please enter your email address below.
                    </Typography>

                    <TextField 
                    id="filled-basic" 
                    label="Email Address" 
                    variant="filled" 
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{width: "100%", marginTop: 5, marginBottom: 6}}
                    />

                    

                    <Box sx={{ gridColumn: "span 1" }}>
                        <Button 
                        onClick={handleSubmission}
                        variant="contained" 
                        sx={{ 
                            height: "50px",
                            width: "100%",
                            backgroundColor: "#404040",
                            '&:hover': {
                            backgroundColor: "#525252",
                            }
                        }}>
                            Get Started
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default HomePage;