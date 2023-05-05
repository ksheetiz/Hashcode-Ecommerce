// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pincode from '../../pincode.json'

export default function handler(req, res) {
    res.status(200).json(pincode);
  }
  