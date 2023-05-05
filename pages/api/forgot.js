// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Forgot from "@/models/Forgot";
import User
 from "@/models/User";
export default async function handler(req, res) {
    // TODO : Check if the user exists in database
    // TODO : Send an email to user
    if(req.body.sendMail){

      let token = '123456789159357456852';

      let forgot= new Forgot({email : req.body.email,token : token});

      let email = `
      It seems like you forgot your password for Hashcode.com If this is true, click the link below to reset your password.
      <br/>
      Reset my password <a href="${reset-pass-url}">${reset-pass-url}</a>
      <br/>
      If you did not forget your password, please disregard this email.`;
 
      res.status(200).json({ name: 'John Doe' })
    }
    else{
      //Reset User Password
    }
  }
  