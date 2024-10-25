import { Field, InputType, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class SubscriberDetails {
    @Field()
    phoneNumber!: string;
  
    @Field({ nullable: true })
    firstName?: string;
  
    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    birthDay?: Date;
}



@ObjectType()
export class SubscriberDto {
  
    @Field()
    details!: SubscriberDetails;
}

@InputType()
export class SubscriberDetailsInput {
    @Field()
    phoneNumber!: string;
  
    @Field({ nullable: true })
    firstName?: string;
  
    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    birthDay?: Date;
}
