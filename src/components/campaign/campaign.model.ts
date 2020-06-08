import * as mongoose from 'mongoose';
import Campaign from './campaign.interface';
 
const campaignSchema = new mongoose.Schema({
  name: String,
  discountType: String,
  validTill: String,
  redemptions: { 
    type: Number, 
    default: 0 
  },
},
{
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
}
);

 
const campaignModel = mongoose.model<Campaign & mongoose.Document>('campaigns', campaignSchema);
 
export default campaignModel;