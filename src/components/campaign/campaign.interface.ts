interface Campaign {
  _id: string;
  name: String,
  discountType: String,
  validTill: String,
  redemptions?: Number,
  createdAt?: String;
  updatedAt?: String;
}
  
export default Campaign;