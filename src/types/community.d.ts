import {
  CommunityProfile,
  CommunityThread,
  CommunityThreadLike,
  CommunityThreadResponse,
  User,
} from "@prisma/client";

export type T_AvialableUserDataInCommunity = {
  roleId: number;
  firstName: string;
  lastName: string | null;
  imageUrl: string;
};

export type T_CommunityProfileWithThreads = CommunityProfile & {
  threads: CommunityThread[];
};

export type T_ThreadWithPublisherData = CommunityThread & {
  publisherCommunityProfile: CommunityProfile & {
    publisherUserData: User;
  };
  responsesCount: number;
  likesCount: number;
  followsCount: number;
};

export type T_ThreadWithResponsesLikesAndFollows = {
  data: T_ThreadWithPublisherData;
  responses: T_ThreadResponseWithPublisherData[];
  follows: CommunityThreadFollow[];
  likes: CommunityThreadLike[];
};

export type T_ThreadResponseWithPublisherData = CommunityThreadResponse & {
  publisherCommunityProfile: CommunityProfile & {
    publisherUserData: User;
  };
};

export type T_ThreadFollowsWithCommunityProfileAndUserData = CommunityThreadFollow & {
  communityProfile: CommunityProfile
}