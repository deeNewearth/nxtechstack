import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class SubscriberDetails {
  @Prop({ required: true })
  phoneNumber!: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  birthDay?: Date;
}

@Schema()
export class Subscriber {
  @Prop({ type: SubscriberDetails, required: true })
  details!: SubscriberDetails;
}

export type SubscriberDocument = Subscriber & Document;
export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
