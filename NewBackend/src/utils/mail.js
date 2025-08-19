import Mailgen from "mailgen"

const emailVerificationMailgenContent = (username,
      verficationUrl)=>{
            return {
                  body:{
                        name:username,
                        intro: "Welcome to our App! we are excited to have you on board.",
                        action:{
                              instructions:"To verify your email please click on the following button",
                              button:{
                                    color: "#22BC66",
                                    text:"verify your email",
                                    link:verficationUrl
                              },
                        },
                        outro: "Need help questions? just reply to this email we love to help"
                  }
            }
      }

      const forgotPasswordMailgenContent = (username,
      passwordRsetUrl)=>{
            return {
                  body:{
                        name:username,
                        intro: "rest the password of your account",
                        action:{
                              instructions:"To reset the password ",
                              button:{
                                    color: "#22BC66",
                                    text:"verify your email",
                                    link:verficationUrl
                              },
                        },
                        outro: "Need help questions? just reply to this email we love to help"
                  }
            }
      }