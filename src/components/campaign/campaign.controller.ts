import * as express from 'express';
import Controller from '../../interfaces/controller.interface';
import validationMiddleware from '../../middleware/validation.middleware';
import campaignModel from '../campaign/campaign.model';
import {CreateCampaignDto, UpdateCampaignDto} from './campaign.dto';
import Campaign from 'components/campaign/campaign.interface';
import NoEntityFoundException from '../../exceptions/NoEntityFoundException';

 
class CampaignController implements Controller {
  public path = '/campaign';
  public router = express.Router();
  private campaign = campaignModel;
 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(CreateCampaignDto), this.create);
    this.router.patch(`${this.path}/:campaignId`, validationMiddleware(UpdateCampaignDto), this.update);
    this.router.delete(`${this.path}/:campaignId`, [], this.delete);
    this.router.get(`${this.path}/list`, [], this.list);
  }

  /**
   * @api {post} /campaign Create new campaign
   * @apiName Create campaign
   * @apiGroup Campaign
   *
   * @apiParam {String} name 
   * @apiParam {String} discountType
   * @apiParam {String} validTill
   *
   * @apiSuccessExample {json} Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "_id": "5ede4f32c2eaf06616907a31",
   *     "name": "Campaign 10",
   *     "discountType": "Discount Type",
   *     "validTill": "2020-07-08T11:02:18.107+00:00",
   *     "redemptions": 0,
   *     "createdAt": "2020-06-08T14:46:10.672Z",
   *     "updatedAt": "2020-06-08T14:46:10.672Z"
   *   }
   * 
   */
  private create = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const campaignData: CreateCampaignDto = request.body;

    this.campaign.create({
      ...campaignData,
    })
    .then((savedModel: Campaign) => {
      response.send(savedModel);
    });
  }

  /**
   * @api {get} /campaign/list List all campaigns
   * @apiName List campaigns
   * @apiGroup Campaign
   * 
   * @apiParam page Query parameter. Default is value 1
   * @apiParam limit Query parameter. Default is value 10
   *
   * @apiSuccessExample {json} Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *       "total": 10,
   *       "page": 2,
   *       "perPage": 5,
   *       "campaigns": [
   *           {
   *               "redemptions": 0,
   *               "_id": "5ede4f26c2eaf06616907a2d",
   *               "name": "Campaign 6",
   *               "discountType": "Discount Type",
   *               "validTill": "2020-06-08T11:02:18.107+00:00",
   *               "createdAt": "2020-06-08T14:45:58.754Z",
   *               "updatedAt": "2020-06-08T14:45:58.754Z",
   *               "__v": 0
   *           },
   *           ...
   *       ]
   *   }
   */
  private list = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const page: number = request.query.page ? Number(request.query.page) : 1;
    const limit: number = request.query.limit ? Number(request.query.limit) : 10;
    
    this.campaign.find({},{},{ skip: (page - 1) * limit, limit })
      .then(async (campaigns: Campaign[]) => {
        response.send({
          total: await this.campaign.countDocuments(),
          page,
          perPage: limit,
          campaigns
        });
      })
  }

  /**
   * @api {patch} /campaign/:campaignId Update campaign
   * @apiName Update campaign
   * @apiGroup Campaign
   * 
   * @apiParam {String} Query parameter
   *
   * @apiParam {String} [name]
   * @apiParam {String} [discountType]
   * @apiParam {String} [validTill]
   * @apiParam {Number} [redemptions]
   *
   * @apiSuccessExample {json} Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "_id": "5ede4f32c2eaf06616907a31",
   *     "name": "Campaign 10",
   *     "discountType": "Discount Type",
   *     "validTill": "2020-07-08T11:02:18.107+00:00",
   *     "redemptions": 0,
   *     "createdAt": "2020-06-08T14:46:10.672Z",
   *     "updatedAt": "2020-06-08T14:46:10.672Z"
   *   }
   * 
   */
  private update = async (request: express.Request, response: express.Response, next: express.NextFunction) => { 
    const campaignId = request.params.campaignId;
    const campaignData: CreateCampaignDto = request.body;
    
    this.campaign.findOneAndUpdate({_id: campaignId}, {
      ...campaignData
    }, {new: true}, (err, campaign) => {
      if (err || !campaign) return next(new NoEntityFoundException('campaign'));
      response.send(campaign);
    })
   
  };

  /**
   * @api {delete} /campaign/:campaignId Remove campaign
   * @apiName Remove campaign
   * @apiGroup Campaign
   * 
   * @apiParam {String} Query parameter
   *
   * @apiSuccessExample {json} Success-Response:
   *   HTTP/1.1 200 OK
   *   {}
   */
  private delete = async (request: express.Request, response: express.Response, next: express.NextFunction) => { 
    const campaignId = request.params.campaignId;

    this.campaign.findOneAndRemove({_id: campaignId}, (err) => {
      if (err) return next(new NoEntityFoundException('campaign'));
      response.send({});
    })
  };

}
 
export default CampaignController;