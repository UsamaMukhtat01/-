export const signupApi = async (formData) =>{
  const userData = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  };
  try {
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    // **********************Below code is commented because there is issue to check password and confirm passwords

    // if (
    //   formData.password !== confirmPassword ||
    //   !formData.password ||
    //   !confirmPassword
    // ) {
    //   setError("Passwords do not match!");
    //   setInterval(() => {
    //     setError(null);
    //   }, 3000);
    //   return;
    // }
    // console.log(response);

    return await response.json();
    
  } catch (error) {
    console.error("Network error:", error);
  }
}

export const signinApi = async (formData)=>{
        
    const userData = {
        email: formData.email,
        password: formData.password,
      }
  
      try{
        const response = await fetch('http://localhost:3000/api/auth/signin',{
          method: "POST",
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(formData), // We can send the data directly from formData or by creating other function. Like below
          // body: JSON.stringify(userData)
        })
        return await response.json()
      }catch(error){
        console.error(error)
      }
      console.log(response)
}