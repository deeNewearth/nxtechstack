import { Field, InputType, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class SubscriberDetails {
    @Field()
    phoneNumber: string = '';
  
    @Field({ nullable: true })
    firstName?: string;
  
    @Field({ nullable: true })
    lastName?: string;

    // only used for month and year
    @Field({ nullable: true })
    birthDay?: Date;
}



@ObjectType()
export class SubscriberDto {
  
    @Field()
    details: SubscriberDetails = {phoneNumber :""}
}

@InputType()
export class SubscriberDetailsInput {
    @Field()
    phoneNumber: string = '';
  
    @Field({ nullable: true })
    firstName?: string;
  
    @Field({ nullable: true })
    lastName?: string;

    // only used for month and year
    @Field({ nullable: true })
    birthDay?: Date;
}
