import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { MyContext } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * A custom scalar representing a date and time in ISO 8601 format, including timezone information.
   * Used for all date and time fields to ensure consistent formatting and parsing throughout the platform.
   */
  DateTime: { input: any; output: any; }
  /**
   * A custom scalar representing a valid email address with proper formatting and validation.
   * Used for user emails and any email-related data to ensure accurate communication channels.
   */
  EmailAddress: { input: any; output: any; }
  /**
   * A custom scalar representing a JSON object.
   * Allows for storing and transferring complex data structures in a flexible, unstructured format.
   */
  JSONObject: { input: any; output: any; }
  /**
   * A custom scalar for rich text content supporting HTML and Markdown syntax.
   * Facilitates the inclusion of formatted text with styling, links, images, and embedded media within content descriptions and other textual fields.
   */
  RichText: { input: any; output: any; }
  /**
   * A custom scalar representing a valid, properly formatted URL.
   * Used for all external links, resource locations, and references to media files.
   */
  URL: { input: any; output: any; }
  /**
   * A custom scalar for handling file uploads via mutations.
   * Enables clients to upload files, such as course materials or user submissions, as part of GraphQL operations.
   */
  Upload: { input: any; output: any; }
};

/**
 * Interface for content requiring access control.
 * Access-controlled entities have defined access levels and groups, ensuring that only authorized users can view or modify them.
 */
export type AccessControlled = {
  accessGroups: Array<Scalars['String']['output']>;
  accessLevel: AccessLevel;
  visibility: Scalars['Boolean']['output'];
};

/** Defines access control levels for content. */
export enum AccessLevel {
  InstructorOnly = 'INSTRUCTOR_ONLY',
  Organization = 'ORGANIZATION',
  Premium = 'PREMIUM',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

/**
 * Represents accessibility information.
 * Accessibility information ensures that content is accessible to all learners, including those with disabilities, by providing features like closed captions and transcripts.
 */
export type AccessibilityInfo = {
  __typename?: 'AccessibilityInfo';
  hasAudioDescription: Scalars['Boolean']['output'];
  hasClosedCaptions: Scalars['Boolean']['output'];
  hasSignLanguage: Scalars['Boolean']['output'];
  hasTranscript: Scalars['Boolean']['output'];
  languages: Array<Scalars['String']['output']>;
  wcagLevel: Scalars['String']['output'];
};

/**
 * Input for accessibility settings.
 * Defines the accessibility features for content, ensuring it is usable by all learners.
 */
export type AccessibilityInput = {
  hasAudioDescription: Scalars['Boolean']['input'];
  hasClosedCaptions: Scalars['Boolean']['input'];
  hasSignLanguage: Scalars['Boolean']['input'];
  hasTranscript: Scalars['Boolean']['input'];
  languages: Array<Scalars['String']['input']>;
  wcagLevel: Scalars['String']['input'];
};

/**
 * Represents a user achievement.
 * Achievements recognize significant accomplishments by learners, such as course completions or skill mastery.
 */
export type Achievement = Node & {
  __typename?: 'Achievement';
  awardedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  criteria: Scalars['JSONObject']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: AchievementType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/**
 * Enum for achievement types.
 * Achievement types classify the various accomplishments learners can earn, recognizing their progress and success in different areas.
 */
export enum AchievementType {
  CourseCompletion = 'COURSE_COMPLETION',
  Milestone = 'MILESTONE',
  Participation = 'PARTICIPATION',
  PerfectScore = 'PERFECT_SCORE',
  SkillMastery = 'SKILL_MASTERY'
}

/**
 * Represents an assessment in the system.
 * An assessment is a tool used to evaluate the knowledge, skills, and abilities of learners.
 * It can include various question types and is used to determine the learner's understanding of the course material.
 */
export type Assessment = Auditable & Node & {
  __typename?: 'Assessment';
  auditLog: Array<AuditEntry>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  description: Scalars['String']['output'];
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  maxAttempts: Scalars['Int']['output'];
  metadata: AssessmentMetadata;
  passingScore: Scalars['Float']['output'];
  questions: Array<Question>;
  rubric?: Maybe<Rubric>;
  timeLimit?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  type: AssessmentType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  version: Scalars['Int']['output'];
  weight?: Maybe<Scalars['Float']['output']>;
};

/**
 * Input for assessment answers.
 * Defines the structure for submitting answers to assessment questions.
 */
export type AssessmentAnswer = {
  answer: Array<Scalars['String']['input']>;
  questionId: Scalars['ID']['input'];
};

/**
 * Error type for assessment-related operations.
 * Assessment errors indicate issues encountered during assessment-related operations, including error codes and messages.
 */
export type AssessmentError = {
  __typename?: 'AssessmentError';
  code: Scalars['String']['output'];
  details?: Maybe<Scalars['JSONObject']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

/**
 * Metadata for assessments.
 * Assessment metadata includes grading scales, reviewer information, and submission guidelines, supporting fair and consistent evaluation processes.
 */
export type AssessmentMetadata = {
  __typename?: 'AssessmentMetadata';
  customFields?: Maybe<Scalars['JSONObject']['output']>;
  gradeScale?: Maybe<Scalars['JSONObject']['output']>;
  reviewers?: Maybe<Array<Scalars['String']['output']>>;
  submissionGuidelines?: Maybe<Scalars['String']['output']>;
};

/**
 * Response payload for assessment operations.
 * This payload delivers the results of assessment-related operations, including success status, the assessment data if applicable, and any errors encountered.
 */
export type AssessmentPayload = {
  __typename?: 'AssessmentPayload';
  assessment?: Maybe<Assessment>;
  errors?: Maybe<Array<AssessmentError>>;
  success: Scalars['Boolean']['output'];
};

/** Represents detailed assessment results. Assessment results are the outcome of a user's attempt at an assessment, including the score, pass status, and feedback. */
export type AssessmentResult = {
  __typename?: 'AssessmentResult';
  assessment: Assessment;
  attemptNumber: Scalars['Int']['output'];
  completedAt: Scalars['DateTime']['output'];
  enrollment: Enrollment;
  feedback?: Maybe<Scalars['String']['output']>;
  gradedBy?: Maybe<User>;
  id: Scalars['ID']['output'];
  passed: Scalars['Boolean']['output'];
  rubricScores?: Maybe<Array<RubricScore>>;
  score: Scalars['Float']['output'];
  startedAt: Scalars['DateTime']['output'];
};

/**
 * Response payload for assessment result operations.
 * This payload provides the outcome of assessment result-related operations, including success status, the result data if applicable, and any errors encountered.
 */
export type AssessmentResultPayload = {
  __typename?: 'AssessmentResultPayload';
  errors?: Maybe<Array<AssessmentError>>;
  result?: Maybe<AssessmentResult>;
  success: Scalars['Boolean']['output'];
};

/**
 * Represents assessment statistics.
 * Assessment statistics offer detailed insights into the performance of assessments, including average scores, pass rates, and submission rates.
 */
export type AssessmentStats = {
  __typename?: 'AssessmentStats';
  averageAttempts: Scalars['Float']['output'];
  averageScore: Scalars['Float']['output'];
  passRate: Scalars['Float']['output'];
  submissionRate: Scalars['Float']['output'];
};

/**
 * Tracks completion status for assessments.
 * Assessment status indicates the current state of an assessment, from initial assignment to final grading.
 */
export enum AssessmentStatus {
  Failed = 'FAILED',
  Graded = 'GRADED',
  InProgress = 'IN_PROGRESS',
  Passed = 'PASSED',
  Pending = 'PENDING',
  Submitted = 'SUBMITTED'
}

/** Defines types of assessments available. */
export enum AssessmentType {
  Exam = 'EXAM',
  PeerReview = 'PEER_REVIEW',
  Practical = 'PRACTICAL',
  Presentation = 'PRESENTATION',
  Project = 'PROJECT',
  Quiz = 'QUIZ'
}

/**
 * Represents a single change within an audit entry.
 * Audit changes detail specific modifications made to fields within an entity, helping to track the history of changes over time.
 */
export type AuditChange = {
  __typename?: 'AuditChange';
  changeType: Scalars['String']['output'];
  field: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  newValue?: Maybe<Scalars['String']['output']>;
  previousValue?: Maybe<Scalars['String']['output']>;
};

/**
 * Represents an audit entry for tracking changes.
 * Audit entries log changes made to entities within the system, providing a comprehensive audit trail for accountability and transparency.
 */
export type AuditEntry = Node & {
  __typename?: 'AuditEntry';
  action: Scalars['String']['output'];
  changes?: Maybe<Array<AuditChange>>;
  createdAt: Scalars['DateTime']['output'];
  entityId: Scalars['ID']['output'];
  entityType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ipAddress?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  sessionId?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['DateTime']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userAgent?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

/**
 * Interface for entities requiring audit tracking.
 * Auditable entities maintain a history of changes, including who made the changes and when, supporting accountability and transparency.
 */
export type Auditable = {
  auditLog: Array<AuditEntry>;
  createdBy: Scalars['String']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  version: Scalars['Int']['output'];
};

/** Base input for content operations. */
export type BaseContentInput = {
  accessibility?: InputMaybe<AccessibilityInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<ContentMetadataInput>;
  title: Scalars['String']['input'];
  type: ContentType;
};

/**
 * Base fields for all metadata types.
 * Metadata inputs provide a flexible structure for additional data associated with entities, supporting customization and integration.
 */
export type BaseMetadataInput = {
  customFields?: InputMaybe<Scalars['JSONObject']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Represents a certificate issued for course completion.
 * Certificates recognize the successful completion of a course, providing validation and documentation of the learner's achievements.
 */
export type Certificate = {
  __typename?: 'Certificate';
  course: Course;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  issuedAt: Scalars['DateTime']['output'];
  issuedTo: User;
  issuer: User;
  metadata: CertificateMetadata;
  status: CertificateStatus;
  type: CertificationType;
  validationHash: Scalars['String']['output'];
};

/**
 * Error type for certificate operations.
 * Certificate errors highlight issues encountered during certificate-related operations, including error codes and messages.
 */
export type CertificateError = {
  __typename?: 'CertificateError';
  code: Scalars['String']['output'];
  details?: Maybe<Scalars['JSONObject']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

/**
 * Metadata for certificates.
 * Certificate metadata contains information about the certificate's template, issuer, and verification details, ensuring authenticity and traceability.
 */
export type CertificateMetadata = {
  __typename?: 'CertificateMetadata';
  customFields?: Maybe<Scalars['JSONObject']['output']>;
  issuerInfo: Scalars['JSONObject']['output'];
  serialNumber: Scalars['String']['output'];
  templateId: Scalars['String']['output'];
  verificationUrl: Scalars['String']['output'];
};

/**
 * Response payload for certificate operations.
 * This payload delivers the results of certificate-related operations, including success status, the certificate data if applicable, and any errors encountered.
 */
export type CertificatePayload = {
  __typename?: 'CertificatePayload';
  certificate?: Maybe<Certificate>;
  errors?: Maybe<Array<CertificateError>>;
  success: Scalars['Boolean']['output'];
};

/**
 * Enum for certificate status.
 * Certificate status indicates the current validity and state of a certificate, from issuance to potential revocation.
 */
export enum CertificateStatus {
  Expired = 'EXPIRED',
  Pending = 'PENDING',
  Revoked = 'REVOKED',
  Valid = 'VALID'
}

/**
 * Defines types of certificates available.
 * Certificate types categorize the different kinds of certificates that can be awarded to learners, based on their achievements.
 */
export enum CertificateType {
  Achievement = 'ACHIEVEMENT',
  Certification = 'CERTIFICATION',
  Completion = 'COMPLETION',
  Participation = 'PARTICIPATION'
}

/**
 * Response payload for certificate validation operations.
 * This payload provides the results of certificate validation checks, indicating success status, whether the certificate is valid, detailed validation information, and any errors encountered.
 */
export type CertificateValidationPayload = {
  __typename?: 'CertificateValidationPayload';
  certificate?: Maybe<Certificate>;
  errors?: Maybe<Array<CertificateError>>;
  isValid: Scalars['Boolean']['output'];
  success: Scalars['Boolean']['output'];
  validationDetails?: Maybe<Scalars['JSONObject']['output']>;
};

/**
 * Enum for certificate types.
 * Certification types specify the nature of the certification awarded, reflecting the learner's accomplishments and the context of the award.
 */
export enum CertificationType {
  Achievement = 'ACHIEVEMENT',
  Attendance = 'ATTENDANCE',
  Certification = 'CERTIFICATION',
  Completion = 'COMPLETION',
  Participation = 'PARTICIPATION'
}

/**
 * Represents completion rate data.
 * Completion rate data provides information on how many learners have completed specific content within a course, along with the average time spent.
 */
export type CompletionRate = {
  __typename?: 'CompletionRate';
  averageTimeSpent: Scalars['Int']['output'];
  contentId: Scalars['ID']['output'];
  rate: Scalars['Float']['output'];
};

/** Represents completion rate ranges. Completion rate ranges are used to group courses by their completion rate, providing a summary of the course engagement and effectiveness. */
export type CompletionRateRange = {
  __typename?: 'CompletionRateRange';
  count: Scalars['Int']['output'];
  courses: Array<Course>;
  max: Scalars['Float']['output'];
  min: Scalars['Float']['output'];
};

/**
 * Represents the actual educational material within a lesson.
 * Content can be of various types, such as video, text, or interactive media, and is the primary medium through which learners engage with the lesson material.
 */
export type Content = {
  __typename?: 'Content';
  accessibility?: Maybe<AccessibilityInfo>;
  data: Scalars['JSONObject']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  format?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  interactivityType?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  metadata: ContentMetadata;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: ContentType;
  url?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

/**
 * Error type for content-related operations.
 * Content errors provide information about issues encountered during content-related operations, including error codes and messages.
 */
export type ContentError = {
  __typename?: 'ContentError';
  code: Scalars['String']['output'];
  details?: Maybe<Scalars['JSONObject']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

/**
 * Input for uploading new content.
 * Facilitates the addition of new content to the platform, supporting various content types and associated metadata.
 */
export type ContentInput = {
  accessibility?: InputMaybe<AccessibilityInput>;
  data?: InputMaybe<Scalars['JSONObject']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  file?: InputMaybe<Scalars['Upload']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  type: ContentType;
  url?: InputMaybe<Scalars['String']['input']>;
};

/**
 * Metadata for content.
 * Content metadata provides information about the source system, technical details, and custom fields, enhancing content management and integration.
 */
export type ContentMetadata = {
  __typename?: 'ContentMetadata';
  customFields?: Maybe<Scalars['JSONObject']['output']>;
  lastSynced?: Maybe<Scalars['DateTime']['output']>;
  sourceSystem?: Maybe<Scalars['String']['output']>;
  technicalDetails?: Maybe<Scalars['JSONObject']['output']>;
};

/**
 * Input for content metadata.
 * Captures metadata for content, including source system and technical details.
 */
export type ContentMetadataInput = {
  customFields?: InputMaybe<Scalars['JSONObject']['input']>;
  sourceSystem?: InputMaybe<Scalars['String']['input']>;
  technicalDetails?: InputMaybe<Scalars['JSONObject']['input']>;
};

/**
 * Response payload for content operations.
 * This payload conveys the outcome of content-related operations, including success status, the content data if applicable, and any errors encountered.
 */
export type ContentPayload = {
  __typename?: 'ContentPayload';
  content?: Maybe<Content>;
  errors?: Maybe<Array<ContentError>>;
  success: Scalars['Boolean']['output'];
};

/**
 * Result of content processing.
 * This payload provides information about the success of content processing operations, including processing time, output details, and any transformations applied.
 */
export type ContentProcessingResult = {
  __typename?: 'ContentProcessingResult';
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  outputUrl?: Maybe<Scalars['String']['output']>;
  processingTime: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
  transformations?: Maybe<Array<Scalars['String']['output']>>;
};

/**
 * Input for tracking content progress.
 * Records progress details for content consumption, including completion percentage and time spent.
 */
export type ContentProgressInput = {
  completionStatus: ProgressStatus;
  contentId: Scalars['ID']['input'];
  enrollmentId: Scalars['ID']['input'];
  progressPercentage: Scalars['Float']['input'];
  timeSpent: Scalars['Int']['input'];
};

/** Represents the status of educational content in the system. */
export enum ContentStatus {
  Archived = 'ARCHIVED',
  Deprecated = 'DEPRECATED',
  Draft = 'DRAFT',
  InReview = 'IN_REVIEW',
  Published = 'PUBLISHED',
  Scheduled = 'SCHEDULED'
}

/** Defines types of educational content available. */
export enum ContentType {
  Assignment = 'ASSIGNMENT',
  Discussion = 'DISCUSSION',
  Interactive = 'INTERACTIVE',
  LiveSession = 'LIVE_SESSION',
  Presentation = 'PRESENTATION',
  Quiz = 'QUIZ',
  Text = 'TEXT',
  Video = 'VIDEO'
}

/**
 * Represents a content validation result.
 * This type provides detailed information about the validity of content, including whether it is valid, any errors or warnings, and additional metadata.
 */
export type ContentValidation = {
  __typename?: 'ContentValidation';
  errors?: Maybe<Array<ContentValidationError>>;
  isValid: Scalars['Boolean']['output'];
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  warnings?: Maybe<Array<ContentValidationWarning>>;
};

/**
 * Error type for content validation issues.
 * Content validation errors provide information about issues encountered during content validation, including error codes and messages.
 */
export type ContentValidationError = {
  __typename?: 'ContentValidationError';
  code: Scalars['String']['output'];
  details?: Maybe<Scalars['JSONObject']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

/**
 * Response payload for content validation operations.
 * This payload provides the results of content validation checks, indicating whether the content is valid, any validation data, and errors or warnings if present.
 */
export type ContentValidationPayload = {
  __typename?: 'ContentValidationPayload';
  errors?: Maybe<Array<ContentError>>;
  success: Scalars['Boolean']['output'];
  validation?: Maybe<ContentValidation>;
};

/** Warning type for content validation. Validation warnings are used to notify about potential issues or non-critical problems in content, allowing for adjustments or improvements. */
export type ContentValidationWarning = {
  __typename?: 'ContentValidationWarning';
  code: Scalars['String']['output'];
  details?: Maybe<Scalars['JSONObject']['output']>;
  message: Scalars['String']['output'];
  severity: WarningSeverity;
};

/**
 * Represents a complete course offered on the learning platform.
 * A course is a structured set of educational materials designed to teach specific skills or knowledge.
 * It includes modules, lessons, assessments, and other resources necessary for learners to achieve their learning objectives.
 */
export type Course = AccessControlled & Auditable & Node & Searchable & {
  __typename?: 'Course';
  accessGroups: Array<Scalars['String']['output']>;
  accessLevel: AccessLevel;
  analytics: CourseAnalytics;
  assessments: Array<Assessment>;
  auditLog: Array<AuditEntry>;
  certificate?: Maybe<Certificate>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  description: Scalars['String']['output'];
  difficultyLevel: DifficultyLevel;
  duration: Scalars['Int']['output'];
  enrollments: Array<Enrollment>;
  id: Scalars['ID']['output'];
  instructors: Array<Instructor>;
  learningObjectives: Array<Scalars['String']['output']>;
  metadata: CourseMetadata;
  modules: Array<Module>;
  prerequisites?: Maybe<Array<Course>>;
  rating?: Maybe<Scalars['Float']['output']>;
  reviews: Array<Review>;
  searchMetadata?: Maybe<Scalars['JSONObject']['output']>;
  skills: Array<Skill>;
  status: ContentStatus;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  version: Scalars['Int']['output'];
  visibility: Scalars['Boolean']['output'];
};

/**
 * Represents aggregated course data.
 * Course aggregations provide summary statistics on courses, such as counts by difficulty level, status, and enrollment ranges.
 */
export type CourseAggregations = {
  __typename?: 'CourseAggregations';
  byCompletionRate: Array<CompletionRateRange>;
  byDifficulty: Array<DifficultyCount>;
  byEnrollmentCount: Array<EnrollmentRange>;
  byRating: Array<RatingRange>;
  byStatus: Array<StatusCount>;
};

/**
 * Represents analytics data for a course.
 * Course analytics provide insights into the performance and engagement of a course, including metrics like enrollment numbers, completion rates, and revenue.
 */
export type CourseAnalytics = {
  __typename?: 'CourseAnalytics';
  activeEnrollments: Scalars['Int']['output'];
  assessmentStats: AssessmentStats;
  averageProgress: Scalars['Float']['output'];
  averageTimeToComplete?: Maybe<Scalars['Int']['output']>;
  completionRate: Scalars['Float']['output'];
  dropoutRate: Scalars['Float']['output'];
  engagementMetrics: EngagementMetrics;
  revenueMetrics?: Maybe<RevenueMetrics>;
  totalEnrollments: Scalars['Int']['output'];
  trendsData: TrendsData;
};

/**
 * Connection type for paginated course results.
 * Course connections facilitate the retrieval of paginated course data, including edges, pagination information, and aggregations.
 */
export type CourseConnection = {
  __typename?: 'CourseConnection';
  aggregations?: Maybe<CourseAggregations>;
  edges: Array<CourseEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/**
 * Edge type for course connections.
 * Course edges link individual course nodes within a connection, providing a cursor for pagination and navigation.
 */
export type CourseEdge = {
  __typename?: 'CourseEdge';
  cursor: Scalars['String']['output'];
  node: Course;
};

/**
 * Error type for course-related operations.
 * Course errors provide information about issues encountered during course-related operations, including error codes and messages.
 */
export type CourseError = {
  __typename?: 'CourseError';
  code: Scalars['String']['output'];
  details?: Maybe<Scalars['JSONObject']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

/**
 * Metadata for courses.
 * Course metadata provides additional information about a course, such as language, duration, and target audience, to enhance discoverability and relevance.
 */
export type CourseMetadata = {
  __typename?: 'CourseMetadata';
  certificationTrack: Scalars['Boolean']['output'];
  customFields?: Maybe<Scalars['JSONObject']['output']>;
  estimatedDuration: Scalars['Int']['output'];
  language: Scalars['String']['output'];
  requirements: Array<Scalars['String']['output']>;
  skillLevel: DifficultyLevel;
  targetAudience: Array<Scalars['String']['output']>;
};

/**
 * Input for course metadata.
 * Captures additional information about a course, such as language, estimated duration, and target audience.
 */
export type CourseMetadataInput = {
  certificationTrack?: InputMaybe<Scalars['Boolean']['input']>;
  customFields?: InputMaybe<Scalars['JSONObject']['input']>;
  estimatedDuration: Scalars['Int']['input'];
  language: Scalars['String']['input'];
  requirements: Array<Scalars['String']['input']>;
  targetAudience: Array<Scalars['String']['input']>;
};

/**
 * Response payload for course operations.
 * This payload provides the outcome of course-related operations, including whether the operation was successful, the course data if applicable, and any errors encountered during the process.
 */
export type CoursePayload = {
  __typename?: 'CoursePayload';
  course?: Maybe<Course>;
  errors?: Maybe<Array<CourseError>>;
  success: Scalars['Boolean']['output'];
};

/**
 * Input for course searching and filtering.
 * Provides criteria for searching and filtering courses, including status, difficulty level, and tags.
 */
export type CourseSearchFilter = {
  difficultyLevel?: InputMaybe<Array<DifficultyLevel>>;
  duration?: InputMaybe<DurationRangeInput>;
  instructorIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  maxRating?: InputMaybe<Scalars['Float']['input']>;
  minRating?: InputMaybe<Scalars['Float']['input']>;
  priceRange?: InputMaybe<PriceRangeInput>;
  query?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Array<ContentStatus>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Represents real-time course update information. Course updates are used to notify about changes to a course, including the type of update, the fields that were updated, and the time and user responsible for the update. */
export type CourseUpdate = {
  __typename?: 'CourseUpdate';
  course: Course;
  updateType: CourseUpdateType;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Scalars['String']['output'];
  updatedFields: Array<Scalars['String']['output']>;
};

/**
 * Enum for course update types.
 * Course update types describe the nature of changes made to a course, reflecting modifications in content, status, or structure.
 */
export enum CourseUpdateType {
  AssessmentAdded = 'ASSESSMENT_ADDED',
  AssessmentUpdated = 'ASSESSMENT_UPDATED',
  ContentUpdated = 'CONTENT_UPDATED',
  EnrollmentChanged = 'ENROLLMENT_CHANGED',
  MetadataUpdated = 'METADATA_UPDATED',
  StatusChanged = 'STATUS_CHANGED'
}

/**
 * Input for creating an assessment.
 * Specifies the details needed to create a new assessment, including questions and grading criteria.
 */
export type CreateAssessmentInput = {
  description: Scalars['String']['input'];
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  maxAttempts: Scalars['Int']['input'];
  passingScore: Scalars['Float']['input'];
  questions: Array<QuestionInput>;
  rubric: RubricInput;
  timeLimit?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  type: AssessmentType;
  weight: Scalars['Float']['input'];
};

/**
 * Input for creating a new course.
 * This input captures all necessary details to initialize a new course, including its title, description, difficulty level, and metadata.
 */
export type CreateCourseInput = {
  accessLevel: AccessLevel;
  description: Scalars['String']['input'];
  difficultyLevel: DifficultyLevel;
  duration: Scalars['Int']['input'];
  learningObjectives: Array<Scalars['String']['input']>;
  metadata: CourseMetadataInput;
  prerequisites?: InputMaybe<Array<Scalars['ID']['input']>>;
  title: Scalars['String']['input'];
};

/**
 * Input for creating an enrollment.
 * Specifies the details needed to enroll a user in a course, including user and course IDs.
 */
export type CreateEnrollmentInput = {
  courseId: Scalars['ID']['input'];
  metadata?: InputMaybe<Scalars['JSONObject']['input']>;
  startDate: Scalars['DateTime']['input'];
  userId: Scalars['ID']['input'];
};

/**
 * Input for creating a new lesson.
 * Specifies the details needed to create a lesson within a module, including its content, duration, and order.
 */
export type CreateLessonInput = {
  content: ContentInput;
  description: Scalars['String']['input'];
  duration: Scalars['Int']['input'];
  metadata: LessonMetadataInput;
  moduleId: Scalars['ID']['input'];
  order: Scalars['Int']['input'];
  prerequisites?: InputMaybe<Array<Scalars['ID']['input']>>;
  title: Scalars['String']['input'];
  type: ContentType;
};

/**
 * Input for creating a new module.
 * Captures the details required to add a new module to a course, including its title, description, and order within the course.
 */
export type CreateModuleInput = {
  courseId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  duration: Scalars['Int']['input'];
  learningObjectives: Array<Scalars['String']['input']>;
  metadata: ModuleMetadataInput;
  order: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

/**
 * Input for date ranges.
 * Specifies a range of dates for filtering data, including start and end dates.
 */
export type DateRangeInput = {
  endDate: Scalars['DateTime']['input'];
  startDate: Scalars['DateTime']['input'];
};

/** Represents count by difficulty level. Difficulty counts are used to group courses by their difficulty level, providing a summary of the course complexity and learner readiness. */
export type DifficultyCount = {
  __typename?: 'DifficultyCount';
  count: Scalars['Int']['output'];
  difficulty: DifficultyLevel;
  percentage: Scalars['Float']['output'];
};

/** Indicates difficulty levels for courses and content. */
export enum DifficultyLevel {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Expert = 'EXPERT',
  Intermediate = 'INTERMEDIATE'
}

/**
 * Input type for duration range filtering.
 * Defines the range of durations for filtering courses, including minimum and maximum values and units. The default unit is minutes.
 */
export type DurationRangeInput = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
  unit?: InputMaybe<DurationUnit>;
};

/**
 * Enum for duration units.
 * Duration units specify the measurement units for time-related fields, ensuring consistency in representing durations across the platform.
 */
export enum DurationUnit {
  Days = 'DAYS',
  Hours = 'HOURS',
  Minutes = 'MINUTES',
  Weeks = 'WEEKS'
}

/**
 * Represents engagement metrics for a course.
 * Engagement metrics track how learners interact with the course content, including session durations, participation rates, and content completion rates.
 */
export type EngagementMetrics = {
  __typename?: 'EngagementMetrics';
  averageSessionDuration: Scalars['Int']['output'];
  averageSessionsPerUser: Scalars['Float']['output'];
  contentCompletionRates: Array<CompletionRate>;
  discussionParticipationRate: Scalars['Float']['output'];
};

/**
 * Represents a user's enrollment in a course.
 * Enrollment tracks a user's participation in a course, including their progress, completion status, and any assessments they have taken.
 */
export type Enrollment = Node & Trackable & {
  __typename?: 'Enrollment';
  assessmentResults: Array<AssessmentResult>;
  certificate?: Maybe<Certificate>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  completionDate?: Maybe<Scalars['DateTime']['output']>;
  course: Course;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastAccessedAt?: Maybe<Scalars['DateTime']['output']>;
  metadata: EnrollmentMetadata;
  progress: Scalars['Float']['output'];
  startDate: Scalars['DateTime']['output'];
  startedAt: Scalars['DateTime']['output'];
  status: ProgressStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

/**
 * Represents a connection type for enrollments.
 * Enrollment connections facilitate the retrieval of paginated enrollment data, including edges and pagination information.
 */
export type EnrollmentConnection = {
  __typename?: 'EnrollmentConnection';
  edges: Array<EnrollmentEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/**
 * Represents an enrollment edge.
 * Enrollment edges link individual enrollment nodes within a connection, providing a cursor for pagination.
 */
export type EnrollmentEdge = {
  __typename?: 'EnrollmentEdge';
  cursor: Scalars['String']['output'];
  node: Enrollment;
};

/**
 * Error type for enrollment-related operations.
 * Enrollment errors provide information about issues encountered during enrollment-related operations, including error codes and messages.
 */
export type EnrollmentError = {
  __typename?: 'EnrollmentError';
  code: Scalars['String']['output'];
  details?: Maybe<Scalars['JSONObject']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

/**
 * Metadata for enrollments.
 * Enrollment metadata captures details about the enrollment source, payment information, and promotional codes, providing context for enrollment activities.
 */
export type EnrollmentMetadata = {
  __typename?: 'EnrollmentMetadata';
  customFields?: Maybe<Scalars['JSONObject']['output']>;
  enrollmentSource: Scalars['String']['output'];
  paymentInfo?: Maybe<Scalars['JSONObject']['output']>;
  promotionalCode?: Maybe<Scalars['String']['output']>;
};

/**
 * Response payload for enrollment operations.
 * This payload delivers the results of enrollment-related operations, including success status, the enrollment data if applicable, and any errors encountered.
 */
export type EnrollmentPayload = {
  __typename?: 'EnrollmentPayload';
  enrollment?: Maybe<Enrollment>;
  errors?: Maybe<Array<EnrollmentError>>;
  success: Scalars['Boolean']['output'];
};

/** Represents real-time enrollment progress updates. Enrollment progress updates are used to notify about changes to a user's progress in a course, including the previous and current progress, the time of update, and the user responsible for the update. */
export type EnrollmentProgress = {
  __typename?: 'EnrollmentProgress';
  completedItems: Array<Scalars['ID']['output']>;
  currentProgress: Scalars['Float']['output'];
  enrollment: Enrollment;
  previousProgress: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Scalars['String']['output'];
};

/** Represents enrollment count ranges. Enrollment count ranges are used to group courses by the number of enrollments, providing a summary of the course popularity and engagement. */
export type EnrollmentRange = {
  __typename?: 'EnrollmentRange';
  count: Scalars['Int']['output'];
  courses: Array<Course>;
  max: Scalars['Int']['output'];
  min: Scalars['Int']['output'];
};

/**
 * Base interface for all error types to ensure consistency.
 * Error interfaces standardize the structure of error messages, providing codes, messages, and additional details for troubleshooting.
 */
export type Error = {
  code: Scalars['String']['output'];
  details?: Maybe<Scalars['JSONObject']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

/**
 * Represents configuration for document generation.
 * Generation configurations define the settings and templates used for creating documents, such as certificates or reports.
 */
export type GenerationConfig = {
  __typename?: 'GenerationConfig';
  format: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  parameters: Scalars['JSONObject']['output'];
  template: Scalars['String']['output'];
  validation: ValidationConfig;
  version: Scalars['String']['output'];
};

/**
 * Input for grading an assessment.
 * Captures the details required to record grades for an assessment, including scores, feedback, and rubric evaluations.
 */
export type GradeAssessmentInput = {
  assessmentId: Scalars['ID']['input'];
  enrollmentId: Scalars['ID']['input'];
  feedback?: InputMaybe<Scalars['String']['input']>;
  gradedBy: Scalars['ID']['input'];
  rubricScores?: InputMaybe<Array<RubricScoreInput>>;
  score: Scalars['Float']['input'];
};

/**
 * Represents an instructor.
 * Instructors are users who create and manage courses, providing educational content and guidance to learners.
 */
export type Instructor = Node & {
  __typename?: 'Instructor';
  biography?: Maybe<Scalars['String']['output']>;
  courses: Array<Course>;
  createdAt: Scalars['DateTime']['output'];
  expertise: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  rating?: Maybe<Scalars['Float']['output']>;
  reviews: Array<Review>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

/**
 * Represents a learning path.
 * Learning paths guide learners through a sequence of courses, helping them achieve specific educational goals or career objectives.
 */
export type LearningPath = Node & {
  __typename?: 'LearningPath';
  courses: Array<Course>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  difficulty: DifficultyLevel;
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  prerequisites?: Maybe<Array<LearningPath>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/**
 * Error type for learning path operations.
 * Learning path errors highlight issues encountered during learning path-related operations, including error codes and messages.
 */
export type LearningPathError = {
  __typename?: 'LearningPathError';
  code: Scalars['String']['output'];
  details?: Maybe<Scalars['JSONObject']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

/**
 * Response payload for learning path operations.
 * This payload conveys the results of learning path-related operations, including success status, the learning path data if applicable, and any errors encountered.
 */
export type LearningPathPayload = {
  __typename?: 'LearningPathPayload';
  errors?: Maybe<Array<LearningPathError>>;
  learningPath?: Maybe<LearningPath>;
  success: Scalars['Boolean']['output'];
};

/**
 * Represents an individual lesson within a module.
 * Lessons are the building blocks of a module, containing educational content such as videos, texts, or interactive activities.
 * They are designed to convey specific information or skills to the learner.
 */
export type Lesson = AccessControlled & Auditable & Node & Searchable & {
  __typename?: 'Lesson';
  accessGroups: Array<Scalars['String']['output']>;
  accessLevel: AccessLevel;
  assessments: Array<Assessment>;
  auditLog: Array<AuditEntry>;
  content: Content;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  description: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  metadata: LessonMetadata;
  order: Scalars['Int']['output'];
  prerequisites?: Maybe<Array<Lesson>>;
  searchMetadata?: Maybe<Scalars['JSONObject']['output']>;
  status: ContentStatus;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  type: ContentType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  version: Scalars['Int']['output'];
  visibility: Scalars['Boolean']['output'];
};

/**
 * Connection type for paginated lesson results.
 * Lesson connections provide access to paginated lesson data, helping learners and instructors manage and explore lesson content.
 */
export type LessonConnection = {
  __typename?: 'LessonConnection';
  edges: Array<LessonEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/**
 * Edge type for lesson connections.
 * Lesson edges link individual lesson nodes within a connection, facilitating pagination and content exploration.
 */
export type LessonEdge = {
  __typename?: 'LessonEdge';
  cursor: Scalars['String']['output'];
  node: Lesson;
};

/**
 * Error type for lesson-related operations.
 * Lesson errors indicate issues encountered during lesson-related operations, including error codes and messages.
 */
export type LessonError = {
  __typename?: 'LessonError';
  code: Scalars['String']['output'];
  details?: Maybe<Scalars['JSONObject']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

/**
 * Metadata for lessons.
 * Lesson metadata describes the interactivity level, resource type, and technical requirements of a lesson, supporting effective content delivery.
 */
export type LessonMetadata = {
  __typename?: 'LessonMetadata';
  customFields?: Maybe<Scalars['JSONObject']['output']>;
  interactivityLevel: Scalars['String']['output'];
  resourceType: Scalars['String']['output'];
  technicalRequirements: Array<Scalars['String']['output']>;
};

/**
 * Input for lesson metadata.
 * Describes metadata for a lesson, including interactivity level and technical requirements.
 */
export type LessonMetadataInput = {
  customFields?: InputMaybe<Scalars['JSONObject']['input']>;
  interactivityLevel: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
  technicalRequirements: Array<Scalars['String']['input']>;
};

/**
 * Response payload for lesson operations.
 * This payload conveys the outcome of lesson-related operations, including success status, the lesson data if applicable, and any errors encountered.
 */
export type LessonPayload = {
  __typename?: 'LessonPayload';
  errors?: Maybe<Array<LessonError>>;
  lesson?: Maybe<Lesson>;
  success: Scalars['Boolean']['output'];
};

export type LoginInput = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
};

/**
 * Base interface for all metadata types to ensure consistency.
 * Metadata interfaces provide a common structure for additional information associated with entities, supporting extensibility and integration.
 */
export type Metadata = {
  customFields?: Maybe<Scalars['JSONObject']['output']>;
  lastUpdated?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/**
 * Represents a module within a course, grouping related lessons together.
 * Modules are subdivisions of a course that focus on specific topics or skills.
 * They help organize the course content into manageable sections, each containing lessons and assessments.
 */
export type Module = Auditable & Node & Searchable & {
  __typename?: 'Module';
  auditLog: Array<AuditEntry>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  description: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  learningObjectives: Array<Scalars['String']['output']>;
  lessons: Array<Lesson>;
  metadata: ModuleMetadata;
  order: Scalars['Int']['output'];
  prerequisites?: Maybe<Array<Module>>;
  searchMetadata?: Maybe<Scalars['JSONObject']['output']>;
  status: ContentStatus;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  version: Scalars['Int']['output'];
};

/**
 * Connection type for paginated module results.
 * Module connections enable the retrieval of paginated module data, supporting efficient navigation and exploration of course structures.
 */
export type ModuleConnection = {
  __typename?: 'ModuleConnection';
  edges: Array<ModuleEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/**
 * Edge type for module connections.
 * Module edges connect individual module nodes within a connection, supporting pagination and efficient data retrieval.
 */
export type ModuleEdge = {
  __typename?: 'ModuleEdge';
  cursor: Scalars['String']['output'];
  node: Module;
};

/**
 * Error type for module-related operations.
 * Module errors highlight issues encountered during module-related operations, including error codes and messages.
 */
export type ModuleError = {
  __typename?: 'ModuleError';
  code: Scalars['String']['output'];
  details?: Maybe<Scalars['JSONObject']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

/**
 * Metadata for modules.
 * Module metadata includes details like estimated duration and learning objectives, helping to organize and present module content effectively.
 */
export type ModuleMetadata = {
  __typename?: 'ModuleMetadata';
  customFields?: Maybe<Scalars['JSONObject']['output']>;
  estimatedDuration: Scalars['Int']['output'];
  learningObjectives: Array<Scalars['String']['output']>;
  resourceCount: Scalars['Int']['output'];
};

/**
 * Input for module metadata.
 * Provides metadata details for a module, including estimated duration and learning objectives.
 */
export type ModuleMetadataInput = {
  customFields?: InputMaybe<Scalars['JSONObject']['input']>;
  estimatedDuration: Scalars['Int']['input'];
  learningObjectives: Array<Scalars['String']['input']>;
};

/**
 * Response payload for module operations.
 * This payload delivers the results of module-related operations, indicating success status, the module data if applicable, and any errors that occurred.
 */
export type ModulePayload = {
  __typename?: 'ModulePayload';
  errors?: Maybe<Array<ModuleError>>;
  module?: Maybe<Module>;
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Archives content while maintaining references and historical data.
   * Affects visibility in courses and modules using this content.
   *
   * @param id - ID of the content to archive
   * @throws NotFoundError if content doesn't exist
   * @throws StateError if content is already archived
   * @throws AuthorizationError if user lacks archive permission
   */
  archiveContent: ContentPayload;
  /**
   * Archives a course, making it unavailable for new enrollments while preserving existing data.
   * Enrolled students can still access content but new enrollments are blocked.
   *
   * @param id - Unique identifier of the course to archive
   * @throws NotFoundError if course doesn't exist
   * @throws StateError if course is already archived
   * @throws AuthorizationError if user lacks archive permission
   */
  archiveCourse: CoursePayload;
  /**
   * Archives a lesson, making it inaccessible while preserving its data.
   * Affects module structure and enrollment access to lesson content.
   *
   * @param id - Unique identifier of the lesson to archive
   * @throws NotFoundError if lesson doesn't exist
   * @throws StateError if lesson is already archived
   * @throws AuthorizationError if user lacks archive permission
   */
  archiveLesson: LessonPayload;
  /**
   * Archives a module, making it inaccessible while preserving its data.
   * Affects course structure and enrollment access to module content.
   *
   * @param id - Unique identifier of the module to archive
   * @throws NotFoundError if module doesn't exist
   * @throws StateError if module is already archived
   * @throws AuthorizationError if user lacks archive permission
   */
  archiveModule: ModulePayload;
  /**
   * Creates a new assessment with specified questions and settings.
   * Supports multiple question types and grading configurations.
   *
   * @param input - Assessment creation details including questions and rubric
   * @throws ValidationError if assessment configuration is invalid
   * @throws AuthorizationError if user lacks assessment creation permission
   */
  createAssessment: AssessmentPayload;
  /**
   * Creates a new course with specified details.
   * Initializes all necessary course components and metadata.
   *
   * @param input - Course creation details including title, description, and settings
   * @throws ValidationError if required fields are missing or invalid
   * @throws AuthorizationError if user lacks course creation permission
   */
  createCourse: CoursePayload;
  /**
   * Creates a new enrollment for a user in a specific course.
   * Initializes progress tracking and generates necessary analytics events.
   *
   * @param input - Enrollment details including user and course IDs
   * @throws ValidationError if enrollment parameters are invalid
   * @throws DuplicateError if user is already enrolled
   */
  createEnrollment: EnrollmentPayload;
  /**
   * Creates a new lesson within a specified module.
   * Automatically handles lesson ordering and content initialization.
   *
   * @param input - Lesson creation details including module association and content
   * @throws ValidationError if lesson details are invalid
   * @throws NotFoundError if module doesn't exist
   * @throws AuthorizationError if user lacks lesson creation permission
   */
  createLesson: LessonPayload;
  /**
   * Creates a new module within a specified course.
   * Automatically handles module ordering and course structure updates.
   *
   * @param input - Module creation details including course association
   * @throws ValidationError if module details are invalid
   * @throws NotFoundError if associated course doesn't exist
   */
  createModule: ModulePayload;
  /**
   * Creates a complete copy of an existing course with a new title.
   * Duplicates all modules, lessons, assessments, and content while generating new IDs.
   *
   * @param id - ID of the course to duplicate
   * @param newTitle - Title for the duplicated course
   * @throws NotFoundError if source course doesn't exist
   * @throws AuthorizationError if user lacks duplication permission
   */
  duplicateCourse: CoursePayload;
  /**
   * Creates a duplicate of an existing module in the same or different course.
   * Copies all content, assessments, and settings while generating new IDs.
   *
   * @param id - ID of the module to duplicate
   * @param courseId - ID of the course to place the duplicated module
   * @throws NotFoundError if source module or target course doesn't exist
   * @throws AuthorizationError if user lacks duplication permission
   */
  duplicateModule: ModulePayload;
  /**
   * Extends the duration of an existing enrollment.
   * Updates access period and recalculates completion deadlines.
   *
   * @param id - ID of the enrollment to extend
   * @param extensionDays - Number of days to extend the enrollment
   * @throws NotFoundError if enrollment doesn't exist
   * @throws ValidationError if extension period is invalid
   * @throws AuthorizationError if user lacks extension permission
   * @throws StateError if enrollment is not extendable (e.g., completed or archived)
   */
  extendEnrollment: EnrollmentPayload;
  /**
   * Records grades for a submitted assessment.
   * Supports both automated and manual grading processes.
   *
   * @param input - Grading details including scores and feedback
   * @throws NotFoundError if assessment or submission doesn't exist
   * @throws ValidationError if grading data is invalid
   * @throws AuthorizationError if user lacks grading permission
   */
  gradeAssessment: AssessmentResultPayload;
  /**
   * Issues a certificate for a completed course enrollment.
   * Generates digital certificate with unique validation hash.
   *
   * @param enrollmentId - ID of the completed enrollment
   * @throws ValidationError if completion requirements not met
   * @throws StateError if certificate already issued
   * @throws AuthorizationError if user lacks certificate issuance permission
   */
  issueCertificate: CertificatePayload;
  /**
   * Authenticates a user and returns a JWT token for subsequent requests.
   * Supports multiple authentication strategies based on configuration.
   *
   * @param credentials - User login credentials
   * @throws AuthenticationError if credentials are invalid
   * @throws RateLimitError if too many failed attempts
   */
  login: LoginResponse;
  /**
   * Marks a lesson as complete for a specific enrollment.
   * Updates progress tracking and triggers achievement checks.
   *
   * @param enrollmentId - ID of the enrollment
   * @param lessonId - ID of the lesson to mark as complete
   * @throws NotFoundError if enrollment or lesson doesn't exist
   * @throws ValidationError if lesson completion requirements not met
   * @throws AuthorizationError if user lacks permission
   */
  markLessonComplete: ProgressPayload;
  /**
   * Temporarily suspends an active enrollment while preserving progress.
   * Useful for handling payment issues or temporary access restrictions.
   *
   * @param id - ID of the enrollment to pause
   * @throws NotFoundError if enrollment doesn't exist
   * @throws StateError if enrollment is not in an active state
   * @throws AuthorizationError if user lacks pause permission
   */
  pauseEnrollment: EnrollmentPayload;
  /**
   * Publishes a course, making it available for student enrollment.
   * Performs validation checks on course content and structure before publishing.
   *
   * @param id - Unique identifier of the course to publish
   * @throws ValidationError if course content is incomplete or invalid
   * @throws StateError if course is already published
   * @throws AuthorizationError if user lacks publish permission
   */
  publishCourse: CoursePayload;
  /**
   * Allows an additional attempt at a previously submitted assessment.
   * Configures new attempt settings while preserving previous submissions.
   *
   * @param enrollmentId - ID of the enrollment requesting retake
   * @param assessmentId - ID of the assessment to retake
   * @throws NotFoundError if enrollment or assessment doesn't exist
   * @throws ValidationError if maximum attempts exceeded
   * @throws AuthorizationError if user lacks retake permission
   */
  reopenAssessment: AssessmentPayload;
  /**
   * Reorders lessons within a module to change their sequence.
   * Updates all affected lessons to maintain consistent ordering.
   *
   * @param moduleId - ID of the module containing the lessons
   * @param lessonOrder - New ordered array of lesson IDs
   * @throws ValidationError if order is invalid or lessons are missing
   * @throws AuthorizationError if user lacks reorder permission
   */
  reorderLessons: ModulePayload;
  /**
   * Reorders modules within a course to change their sequence.
   * Updates all affected modules to maintain consistent ordering.
   *
   * @param courseId - ID of the course containing the modules
   * @param moduleOrder - New ordered array of module IDs
   * @throws ValidationError if order is invalid or modules are missing
   * @throws AuthorizationError if user lacks reorder permission
   */
  reorderModules: CoursePayload;
  /**
   * Resets progress for a specific module within an enrollment.
   * Clears completion status and resets all associated assessments.
   *
   * @param enrollmentId - ID of the enrollment
   * @param moduleId - ID of the module to reset
   * @throws NotFoundError if enrollment or module doesn't exist
   * @throws StateError if module is locked or unavailable
   * @throws AuthorizationError if user lacks reset permission
   */
  resetProgress: ProgressPayload;
  /**
   * Reactivates a previously paused enrollment.
   * Restores access and continues progress tracking.
   *
   * @param id - ID of the enrollment to resume
   * @throws NotFoundError if enrollment doesn't exist
   * @throws StateError if enrollment is not in a paused state
   * @throws AuthorizationError if user lacks resume permission
   */
  resumeEnrollment: EnrollmentPayload;
  /**
   * Revokes a previously issued certificate.
   * Marks certificate as invalid while maintaining audit trail.
   *
   * @param certificateId - ID of the certificate to revoke
   * @param reason - Reason for certificate revocation
   * @throws NotFoundError if certificate doesn't exist
   * @throws StateError if certificate already revoked
   * @throws AuthorizationError if user lacks revocation permission
   */
  revokeCertificate: CertificatePayload;
  /**
   * Schedules a course for a specific time period with enrollment windows.
   * Useful for cohort-based courses with specific start and end dates.
   *
   * @param input - Scheduling details including dates and enrollment deadlines
   * @throws ValidationError if dates are invalid or in the past
   * @throws ConflictError if schedule conflicts with existing cohorts
   */
  scheduleCourse: CoursePayload;
  /**
   * Submits an assessment for grading.
   * Handles both automated and manual grading workflows.
   *
   * @param input - Assessment submission details including answers
   * @throws ValidationError if submission is incomplete or invalid
   * @throws TimeoutError if submission window has expired
   */
  submitAssessment: AssessmentPayload;
  /**
   * Tracks detailed progress for content consumption.
   * Records time spent, completion percentage, and interaction data.
   *
   * @param input - Content progress tracking details
   * @throws ValidationError if progress data is invalid
   * @throws NotFoundError if content or enrollment doesn't exist
   * @throws StateError if content tracking is disabled
   */
  trackContentProgress: ProgressPayload;
  /**
   * Transfers an enrollment from one user to another.
   * Preserves all progress, assessment results, and historical data.
   *
   * @param input - Transfer details including source and target users
   * @throws NotFoundError if enrollment doesn't exist
   * @throws ValidationError if transfer parameters are invalid
   * @throws AuthorizationError if user lacks transfer permission
   * @throws StateError if enrollment is not transferable
   */
  transferEnrollment: EnrollmentPayload;
  /**
   * Updates an existing assessment's configuration or content.
   * Preserves existing submissions and grades while updating settings.
   *
   * @param input - Updated assessment configuration
   * @throws NotFoundError if assessment doesn't exist
   * @throws ValidationError if updates are invalid
   * @throws AuthorizationError if user lacks assessment update permission
   */
  updateAssessment: AssessmentPayload;
  /**
   * Updates existing content with new data or metadata.
   * Preserves version history and handles content reprocessing if needed.
   *
   * @param input - Updated content information and settings
   * @throws NotFoundError if content doesn't exist
   * @throws ValidationError if updates are invalid
   * @throws AuthorizationError if user lacks content update permission
   */
  updateContent: ContentPayload;
  /**
   * Updates an existing course with new information.
   * Only provided fields will be updated, others remain unchanged.
   *
   * @param input - Updated course information
   * @throws NotFoundError if course doesn't exist
   * @throws ValidationError if updates are invalid
   * @throws AuthorizationError if user lacks course update permission
   */
  updateCourse: CoursePayload;
  /**
   * Updates progress for an existing enrollment.
   * Tracks completion status and triggers relevant achievement checks.
   *
   * @param input - Progress update details
   * @throws NotFoundError if enrollment doesn't exist
   * @throws ValidationError if progress data is invalid
   */
  updateEnrollmentProgress: EnrollmentPayload;
  /**
   * Updates the learning path for a specific user.
   * Modifies course sequence and completion deadlines.
   *
   * @param input - Learning path update details
   * @throws ValidationError if path configuration is invalid
   * @throws NotFoundError if user or courses don't exist
   * @throws AuthorizationError if user lacks path modification permission
   */
  updateLearningPath: LearningPathPayload;
  /**
   * Updates an existing lesson with new content or settings.
   * Maintains lesson order and relationships within the module.
   *
   * @param input - Updated lesson information and content
   * @throws NotFoundError if lesson doesn't exist
   * @throws ValidationError if updates are invalid
   * @throws AuthorizationError if user lacks lesson update permission
   */
  updateLesson: LessonPayload;
  /**
   * Updates an existing module with new content or settings.
   * Maintains module order and relationships within the course.
   *
   * @param input - Updated module information and settings
   * @throws NotFoundError if module doesn't exist
   * @throws ValidationError if updates are invalid
   * @throws AuthorizationError if user lacks module update permission
   */
  updateModule: ModulePayload;
  /**
   * Updates subscriber details with new information.
   * All fields are optional except phoneNumber which is required for identification.
   *
   * @param details - Updated subscriber information
   * @throws ValidationError if phone number format is invalid
   * @throws NotFoundError if subscriber doesn't exist
   */
  updateSubscriberDetails: Subscriber;
  /**
   * Uploads new content to the platform with support for various content types.
   * Handles file processing, validation, and metadata extraction.
   *
   * @param input - Content upload details including file, metadata, and settings
   * @throws ValidationError if content format is unsupported
   * @throws StorageError if upload fails
   * @throws ProcessingError if content processing fails
   */
  uploadContent: ContentPayload;
  /**
   * Validates a certificate's authenticity and current status.
   * Verifies digital signatures and checks against revocation list.
   *
   * @param certificateId - ID of the certificate to validate
   * @throws NotFoundError if certificate doesn't exist
   * @returns Detailed validation status and certificate information
   */
  validateCertificate: CertificateValidationPayload;
  /**
   * Validates content against platform standards and accessibility requirements.
   * Performs comprehensive checks including format, size, and compliance.
   *
   * @param id - ID of the content to validate
   * @throws NotFoundError if content doesn't exist
   * @throws ValidationError if content fails validation checks
   * @returns Detailed validation results with warnings and errors
   */
  validateContent: ContentValidationPayload;
};


export type MutationArchiveContentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationArchiveCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationArchiveLessonArgs = {
  id: Scalars['ID']['input'];
};


export type MutationArchiveModuleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateAssessmentArgs = {
  input: CreateAssessmentInput;
};


export type MutationCreateCourseArgs = {
  input: CreateCourseInput;
};


export type MutationCreateEnrollmentArgs = {
  input: CreateEnrollmentInput;
};


export type MutationCreateLessonArgs = {
  input: CreateLessonInput;
};


export type MutationCreateModuleArgs = {
  input: CreateModuleInput;
};


export type MutationDuplicateCourseArgs = {
  id: Scalars['ID']['input'];
  newTitle: Scalars['String']['input'];
};


export type MutationDuplicateModuleArgs = {
  courseId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type MutationExtendEnrollmentArgs = {
  extensionDays: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
};


export type MutationGradeAssessmentArgs = {
  input: GradeAssessmentInput;
};


export type MutationIssueCertificateArgs = {
  enrollmentId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  credentials: LoginInput;
};


export type MutationMarkLessonCompleteArgs = {
  enrollmentId: Scalars['ID']['input'];
  lessonId: Scalars['ID']['input'];
};


export type MutationPauseEnrollmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationPublishCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationReopenAssessmentArgs = {
  assessmentId: Scalars['ID']['input'];
  enrollmentId: Scalars['ID']['input'];
};


export type MutationReorderLessonsArgs = {
  lessonOrder: Array<Scalars['ID']['input']>;
  moduleId: Scalars['ID']['input'];
};


export type MutationReorderModulesArgs = {
  courseId: Scalars['ID']['input'];
  moduleOrder: Array<Scalars['ID']['input']>;
};


export type MutationResetProgressArgs = {
  enrollmentId: Scalars['ID']['input'];
  moduleId: Scalars['ID']['input'];
};


export type MutationResumeEnrollmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRevokeCertificateArgs = {
  certificateId: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
};


export type MutationScheduleCourseArgs = {
  input: ScheduleCourseInput;
};


export type MutationSubmitAssessmentArgs = {
  input: SubmitAssessmentInput;
};


export type MutationTrackContentProgressArgs = {
  input: ContentProgressInput;
};


export type MutationTransferEnrollmentArgs = {
  input: TransferEnrollmentInput;
};


export type MutationUpdateAssessmentArgs = {
  input: UpdateAssessmentInput;
};


export type MutationUpdateContentArgs = {
  input: UpdateContentInput;
};


export type MutationUpdateCourseArgs = {
  input: UpdateCourseInput;
};


export type MutationUpdateEnrollmentProgressArgs = {
  input: UpdateProgressInput;
};


export type MutationUpdateLearningPathArgs = {
  input: UpdateLearningPathInput;
};


export type MutationUpdateLessonArgs = {
  input: UpdateLessonInput;
};


export type MutationUpdateModuleArgs = {
  input: UpdateModuleInput;
};


export type MutationUpdateSubscriberDetailsArgs = {
  details: SubscriberDetailsInput;
};


export type MutationUploadContentArgs = {
  input: UploadContentInput;
};


export type MutationValidateCertificateArgs = {
  certificateId: Scalars['ID']['input'];
};


export type MutationValidateContentArgs = {
  id: Scalars['ID']['input'];
};

/**
 * Base interface for all node types in the system.
 * Nodes are fundamental entities within the system, each with a unique identifier and timestamps for creation and updates.
 */
export type Node = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/**
 * Base type for operation errors.
 * Operation errors provide information about issues encountered during operations, including error codes, messages, and details about the operation.
 */
export type OperationError = Error & {
  __typename?: 'OperationError';
  code: Scalars['String']['output'];
  details?: Maybe<Scalars['JSONObject']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  operation: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

/**
 * Represents standard Relay pagination information.
 * Pagination information helps manage large datasets by providing details on the current page, available pages, and navigation options.
 */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/**
 * Input for pagination.
 * Defines parameters for paginating results, including the number of items and cursor positions. The default direction is forward.
 */
export type PaginationInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Input type for price range filtering.
 * Specifies the range of prices for filtering courses, including minimum and maximum values. The default currency is USD.
 */
export type PriceRangeInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
};

/**
 * Base type for processing errors.
 * Processing errors indicate issues encountered during data processing, including error codes, messages, and failure points, to aid in troubleshooting.
 */
export type ProcessingError = Error & {
  __typename?: 'ProcessingError';
  code: Scalars['String']['output'];
  details?: Maybe<Scalars['JSONObject']['output']>;
  failurePoint: Scalars['String']['output'];
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  processId: Scalars['String']['output'];
};

/** Represents detailed progress tracking. Progress is the result of a user's activity in a course, including the lesson, module, and overall status. */
export type Progress = {
  __typename?: 'Progress';
  completedItems: Scalars['Int']['output'];
  enrollment: Enrollment;
  id: Scalars['ID']['output'];
  lastActivity: Scalars['DateTime']['output'];
  lesson?: Maybe<Lesson>;
  metadata: ProgressMetadata;
  module?: Maybe<Module>;
  percentage: Scalars['Float']['output'];
  status: ProgressStatus;
  timeSpent: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
};

/**
 * Error type for progress tracking operations.
 * Progress errors indicate issues encountered during progress tracking operations, including error codes and messages.
 */
export type ProgressError = {
  __typename?: 'ProgressError';
  code: Scalars['String']['output'];
  details?: Maybe<Scalars['JSONObject']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

/**
 * Metadata for progress tracking.
 * Progress metadata records detailed information about a learner's progress, including checkpoints and device usage, to support personalized learning experiences.
 */
export type ProgressMetadata = {
  __typename?: 'ProgressMetadata';
  customFields?: Maybe<Scalars['JSONObject']['output']>;
  deviceInfo?: Maybe<Scalars['JSONObject']['output']>;
  lastCheckpoint?: Maybe<Scalars['String']['output']>;
  timePerModule?: Maybe<Scalars['JSONObject']['output']>;
};

/**
 * Response payload for progress tracking operations.
 * This payload provides the outcome of progress tracking operations, indicating success status, the progress data if applicable, and any errors encountered.
 */
export type ProgressPayload = {
  __typename?: 'ProgressPayload';
  errors?: Maybe<Array<ProgressError>>;
  progress?: Maybe<Progress>;
  success: Scalars['Boolean']['output'];
};

/** Tracks progress status for learning activities. */
export enum ProgressStatus {
  Completed = 'COMPLETED',
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED'
}

export type Query = {
  __typename?: 'Query';
  /**
   * Validates content against accessibility standards and platform requirements.
   * Performs comprehensive checks for compliance and quality assurance.
   *
   * @param id - ID of the content to validate
   * @returns Validation results including warnings and errors if any
   */
  contentValidation: ContentValidationPayload;
  /**
   * Retrieves detailed information about a specific course by its unique identifier.
   * Returns comprehensive course data including modules, enrollments, and analytics.
   *
   * @param id - Unique identifier of the course
   * @throws NotFoundError if course doesn't exist
   * @throws AuthorizationError if user lacks permission to view the course
   */
  course: CoursePayload;
  /**
   * Retrieves comprehensive analytics data for a specific course within a date range.
   * Includes enrollment metrics, completion rates, assessment statistics, and revenue data.
   *
   * @param courseId - ID of the course to analyze
   * @param dateRange - Optional date range for filtering analytics data
   * @throws NotFoundError if course doesn't exist
   * @throws AuthorizationError if user lacks analytics access permission
   */
  courseAnalytics: CourseAnalytics;
  /**
   * Retrieves detailed progress information for a specific enrollment.
   * Includes completion status, time spent, and achievement data.
   *
   * @param enrollmentId - ID of the enrollment to check progress
   * @throws NotFoundError if enrollment doesn't exist
   * @throws AuthorizationError if user lacks permission to view progress
   */
  enrollmentProgress: ProgressPayload;
  /**
   * Retrieves a list of subscribers based on optional filtering criteria.
   * If no filters are provided, returns all subscribers.
   *
   * @param phoneNumber - Optional E.164 format phone number to filter subscribers
   * @param name - Optional name to filter subscribers by first or last name
   */
  getSubscribers: Array<Subscriber>;
  /**
   * Placeholder query for testing purposes.
   * Will be deprecated in future versions.
   */
  placeholder?: Maybe<Scalars['String']['output']>;
  /**
   * Performs an advanced search across all courses based on multiple criteria.
   * Supports pagination and returns aggregated statistics about the search results.
   *
   * @param filter - Optional search criteria including text, difficulty level, ratings, etc.
   * @param pagination - Optional pagination parameters for result set control
   * @returns CourseConnection with edges, pagination info, and result aggregations
   */
  searchCourses: CourseConnection;
  /**
   * Returns the current uptime of the server in seconds.
   * Useful for health checks and monitoring.
   */
  uptime: Scalars['Float']['output'];
  /**
   * Retrieves all enrollments for a specific user with optional status filtering.
   * Results are paginated and include detailed progress information.
   *
   * @param userId - ID of the user whose enrollments to retrieve
   * @param status - Optional filter for enrollment status
   * @param pagination - Optional pagination parameters
   * @throws AuthorizationError if requester lacks permission to view user's enrollments
   */
  userEnrollments: EnrollmentConnection;
  /**
   * Validates the authenticity and current status of a certificate.
   * Verifies digital signatures and checks revocation status.
   *
   * @param id - Unique identifier of the certificate to validate
   * @returns Validation status and detailed certificate information if valid
   */
  validateCertificate: CertificateValidationPayload;
};


export type QueryContentValidationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCourseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCourseAnalyticsArgs = {
  courseId: Scalars['ID']['input'];
  dateRange?: InputMaybe<DateRangeInput>;
};


export type QueryEnrollmentProgressArgs = {
  enrollmentId: Scalars['ID']['input'];
};


export type QueryGetSubscribersArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchCoursesArgs = {
  filter?: InputMaybe<CourseSearchFilter>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryUserEnrollmentsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  status?: InputMaybe<ProgressStatus>;
  userId: Scalars['ID']['input'];
};


export type QueryValidateCertificateArgs = {
  id: Scalars['ID']['input'];
};

/**
 * Represents a question in an assessment.
 * Questions are the fundamental components of assessments, designed to evaluate a learner's understanding of the course material.
 */
export type Question = {
  __typename?: 'Question';
  content: Scalars['String']['output'];
  correctAnswer: Array<Scalars['String']['output']>;
  explanation?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  options?: Maybe<Array<QuestionOption>>;
  points: Scalars['Int']['output'];
  type: QuestionType;
};

/**
 * Input type for creating or updating questions.
 * Defines the structure for adding or modifying questions in an assessment.
 */
export type QuestionInput = {
  content: Scalars['String']['input'];
  correctAnswer: Array<Scalars['String']['input']>;
  explanation?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<Array<QuestionOptionInput>>;
  points: Scalars['Int']['input'];
  type: QuestionType;
};

/**
 * Represents an option for a question.
 * Question options are possible answers for multiple-choice or single-choice questions, indicating whether they are correct or not.
 */
export type QuestionOption = {
  __typename?: 'QuestionOption';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isCorrect: Scalars['Boolean']['output'];
};

/**
 * Input type for question options.
 * Specifies the details of options for multiple-choice or single-choice questions.
 */
export type QuestionOptionInput = {
  content: Scalars['String']['input'];
  isCorrect: Scalars['Boolean']['input'];
};

/**
 * Enum for question types.
 * Question types categorize the different formats of questions used in assessments, each requiring specific responses from learners.
 */
export enum QuestionType {
  Code = 'CODE',
  Essay = 'ESSAY',
  FileUpload = 'FILE_UPLOAD',
  MultipleChoice = 'MULTIPLE_CHOICE',
  SingleChoice = 'SINGLE_CHOICE',
  TrueFalse = 'TRUE_FALSE'
}

/** Represents rating ranges. Rating ranges are used to group courses by their average rating, providing a summary of the course quality and popularity. */
export type RatingRange = {
  __typename?: 'RatingRange';
  count: Scalars['Int']['output'];
  courses: Array<Course>;
  max: Scalars['Float']['output'];
  min: Scalars['Float']['output'];
};

/** Represents revenue metrics for a course. Revenue metrics provide a summary of the financial performance of a course, including total revenue, average revenue per student, revenue by period, refund rate, and lifetime value. */
export type RevenueMetrics = {
  __typename?: 'RevenueMetrics';
  averageRevenuePerStudent: Scalars['Float']['output'];
  lifetimeValue: Scalars['Float']['output'];
  refundRate: Scalars['Float']['output'];
  revenueByPeriod: Array<RevenuePeriod>;
  totalRevenue: Scalars['Float']['output'];
};

/** Represents revenue data for a specific period. Revenue periods are used to group revenue data by time intervals, providing a summary of the financial performance over different time periods. */
export type RevenuePeriod = {
  __typename?: 'RevenuePeriod';
  averageRevenuePerEnrollment: Scalars['Float']['output'];
  enrollments: Scalars['Int']['output'];
  period: Scalars['String']['output'];
  revenue: Scalars['Float']['output'];
};

/**
 * Represents a course review.
 * Course reviews provide feedback from learners on their experiences with a course, including ratings and comments.
 */
export type Review = Node & {
  __typename?: 'Review';
  content: Scalars['String']['output'];
  course: Course;
  createdAt: Scalars['DateTime']['output'];
  helpful: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  rating: Scalars['Float']['output'];
  reported: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

/**
 * Represents a rubric for assessment.
 * Rubrics provide criteria for grading assessments, outlining expectations and scoring guidelines for each criterion.
 */
export type Rubric = {
  __typename?: 'Rubric';
  criteria: Array<RubricCriterion>;
  id: Scalars['ID']['output'];
  maxScore: Scalars['Float']['output'];
  passingScore: Scalars['Float']['output'];
};

/**
 * Represents a criterion in a rubric.
 * Rubric criteria define specific aspects of an assessment that are evaluated, each with its own scoring levels and descriptions.
 */
export type RubricCriterion = {
  __typename?: 'RubricCriterion';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  levels: Array<RubricLevel>;
  maxPoints: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

/**
 * Input type for rubric criteria.
 * Specifies the details of criteria within a rubric, including name, description, and scoring levels. The default unit is points.
 */
export type RubricCriterionInput = {
  description: Scalars['String']['input'];
  levels: Array<RubricLevelInput>;
  maxPoints: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

/**
 * Input type for creating or updating rubrics.
 * Defines the structure for adding or modifying rubrics, including criteria and scoring levels. The default unit is points.
 */
export type RubricInput = {
  criteria: Array<RubricCriterionInput>;
  maxScore: Scalars['Float']['input'];
  passingScore: Scalars['Float']['input'];
};

/**
 * Represents a level in a rubric criterion.
 * Rubric levels describe the performance standards for each criterion, with associated points and descriptions.
 */
export type RubricLevel = {
  __typename?: 'RubricLevel';
  description: Scalars['String']['output'];
  points: Scalars['Float']['output'];
};

/**
 * Input type for rubric levels.
 * Defines the scoring levels for a rubric criterion, including points and descriptions. The default unit is points.
 */
export type RubricLevelInput = {
  description: Scalars['String']['input'];
  points: Scalars['Float']['input'];
};

/**
 * Represents a rubric score.
 * Rubric scores record the evaluation of a learner's performance against the rubric criteria, including feedback and points awarded.
 */
export type RubricScore = {
  __typename?: 'RubricScore';
  criterionId: Scalars['ID']['output'];
  feedback?: Maybe<Scalars['String']['output']>;
  score: Scalars['Float']['output'];
};

/**
 * Input for rubric scores.
 * Captures the scores for rubric criteria, including feedback and points awarded.
 */
export type RubricScoreInput = {
  criterionId: Scalars['ID']['input'];
  feedback?: InputMaybe<Scalars['String']['input']>;
  score: Scalars['Float']['input'];
};

/**
 * Input for scheduling a course.
 * Defines the scheduling parameters for a course, including start and end dates, and enrollment deadlines.
 */
export type ScheduleCourseInput = {
  endDate: Scalars['DateTime']['input'];
  enrollmentDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  startDate: Scalars['DateTime']['input'];
  timezone: Scalars['String']['input'];
};

/**
 * Interface for searchable content.
 * Searchable entities can be indexed and retrieved based on their title, description, and associated tags, enhancing discoverability.
 */
export type Searchable = {
  description?: Maybe<Scalars['String']['output']>;
  searchMetadata?: Maybe<Scalars['JSONObject']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
};

/**
 * Represents a skill that can be learned.
 * Skills are specific abilities or knowledge areas that learners can acquire through courses and assessments.
 */
export type Skill = {
  __typename?: 'Skill';
  category: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: DifficultyLevel;
  name: Scalars['String']['output'];
  prerequisites?: Maybe<Array<Skill>>;
};

/** Represents count by status. Status counts are used to group content by their status, providing a summary of the content readiness and availability. */
export type StatusCount = {
  __typename?: 'StatusCount';
  count: Scalars['Int']['output'];
  percentage: Scalars['Float']['output'];
  status: ContentStatus;
};

/**
 * Input for submitting an assessment.
 * Captures the details of an assessment submission, including answers and time spent.
 */
export type SubmitAssessmentInput = {
  answers: Array<AssessmentAnswer>;
  assessmentId: Scalars['ID']['input'];
  enrollmentId: Scalars['ID']['input'];
  timeSpent: Scalars['Int']['input'];
};

/** Represents a subscriber in the system */
export type Subscriber = {
  __typename?: 'Subscriber';
  /** Detailed information about the subscriber */
  details: SubscriberDetails;
};

/** Details about a subscriber including contact and personal information */
export type SubscriberDetails = {
  __typename?: 'SubscriberDetails';
  /** The subscriber's birthday in ISO-8601 format */
  birthDay?: Maybe<Scalars['String']['output']>;
  /** The subscriber's first name */
  firstName?: Maybe<Scalars['String']['output']>;
  /** The subscriber's last name */
  lastName?: Maybe<Scalars['String']['output']>;
  /** The subscriber's phone number in E.164 format */
  phoneNumber: Scalars['String']['output'];
};

export type SubscriberDetailsInput = {
  birthDay?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /**
   * Real-time notifications for assessment submissions.
   * Emits events when assessments are submitted for grading.
   *
   * @param courseId - ID of the course to monitor for submissions
   * @returns AssessmentResult containing submission details and initial grading
   * @throws NotFoundError if course doesn't exist
   * @throws AuthorizationError if user lacks subscription permission
   */
  assessmentSubmitted: AssessmentResult;
  /**
   * Real-time updates for certificate status changes.
   * Emits events for issuance, revocation, and expiration of certificates.
   *
   * @param certificateId - ID of the certificate to monitor
   * @returns Certificate containing updated certificate status and details
   * @throws NotFoundError if certificate doesn't exist
   * @throws AuthorizationError if user lacks subscription permission
   */
  certificateStatusUpdated: Certificate;
  /**
   * Real-time updates for course modifications.
   * Emits events for content updates, status changes, and enrollment changes.
   *
   * @param courseId - ID of the course to monitor
   * @returns CourseUpdate containing update type and modified fields
   * @throws NotFoundError if course doesn't exist
   * @throws AuthorizationError if user lacks subscription permission
   */
  courseUpdated: CourseUpdate;
  /**
   * Real-time updates for enrollment progress changes.
   * Emits events when progress is updated, including completion status changes.
   *
   * @param enrollmentId - ID of the enrollment to monitor
   * @returns EnrollmentProgress containing previous and current progress states
   * @throws NotFoundError if enrollment doesn't exist
   * @throws AuthorizationError if user lacks subscription permission
   */
  enrollmentProgressUpdated: EnrollmentProgress;
  /**
   * Real-time updates for detailed progress tracking.
   * Emits events for lesson completions, time spent, and achievement unlocks.
   *
   * @param enrollmentId - ID of the enrollment to monitor
   * @returns Progress containing detailed progress metrics and status
   * @throws NotFoundError if enrollment doesn't exist
   * @throws AuthorizationError if user lacks subscription permission
   */
  progressUpdated: Progress;
};


export type SubscriptionAssessmentSubmittedArgs = {
  courseId: Scalars['ID']['input'];
};


export type SubscriptionCertificateStatusUpdatedArgs = {
  certificateId: Scalars['ID']['input'];
};


export type SubscriptionCourseUpdatedArgs = {
  courseId: Scalars['ID']['input'];
};


export type SubscriptionEnrollmentProgressUpdatedArgs = {
  enrollmentId: Scalars['ID']['input'];
};


export type SubscriptionProgressUpdatedArgs = {
  enrollmentId: Scalars['ID']['input'];
};

/** Represents time series data points. */
export type TimeSeriesData = {
  __typename?: 'TimeSeriesData';
  timestamp: Scalars['DateTime']['output'];
  trend: TrendDirection;
  value: Scalars['Float']['output'];
};

/**
 * Interface for trackable learning progress.
 * Trackable entities monitor the progress of learners, including start and completion times, to support personalized learning experiences.
 */
export type Trackable = {
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  lastAccessedAt?: Maybe<Scalars['DateTime']['output']>;
  progress: Scalars['Float']['output'];
  startedAt?: Maybe<Scalars['DateTime']['output']>;
};

/**
 * Input for transferring an enrollment.
 * Defines the parameters for transferring an enrollment from one user to another, preserving progress and historical data.
 */
export type TransferEnrollmentInput = {
  enrollmentId: Scalars['ID']['input'];
  maintainProgress: Scalars['Boolean']['input'];
  newUserId: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
};

/**
 * Enum for trend directions.
 * Trend directions indicate the movement or change in a particular metric over time, helping to identify patterns and inform decisions.
 */
export enum TrendDirection {
  Decreasing = 'DECREASING',
  Increasing = 'INCREASING',
  Stable = 'STABLE'
}

/**
 * Represents trend data over time.
 * Trend data tracks changes in key metrics over time, helping to identify patterns and inform decision-making for course improvements.
 */
export type TrendsData = {
  __typename?: 'TrendsData';
  completionTrend: Array<TimeSeriesData>;
  engagementTrend: Array<TimeSeriesData>;
  enrollmentTrend: Array<TimeSeriesData>;
};

/**
 * Input for updating an assessment.
 * Allows for modifications to an existing assessment's configuration and content.
 */
export type UpdateAssessmentInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  maxAttempts: Scalars['Int']['input'];
  passingScore: Scalars['Float']['input'];
  rubric: RubricInput;
  timeLimit?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  weight: Scalars['Float']['input'];
};

/** Input for updating existing content with comprehensive fields. Content updates are used to modify existing content, including title, description, type, data, duration, URL, thumbnail, interactivity type, format, language, and accessibility. */
export type UpdateContentInput = {
  accessibility?: InputMaybe<AccessibilityInput>;
  data?: InputMaybe<Scalars['JSONObject']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  interactivityType?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<ContentMetadataInput>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ContentType>;
  url?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

/**
 * Input for updating a course.
 * Allows for the modification of existing course details, enabling updates to fields like title, description, and metadata.
 */
export type UpdateCourseInput = {
  accessLevel?: InputMaybe<AccessLevel>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficultyLevel?: InputMaybe<DifficultyLevel>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  learningObjectives?: InputMaybe<Array<Scalars['String']['input']>>;
  metadata?: InputMaybe<CourseMetadataInput>;
  prerequisites?: InputMaybe<Array<Scalars['ID']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/**
 * Input for updating a learning path.
 * Allows for modifications to a user's learning path, including course sequence and completion deadlines.
 */
export type UpdateLearningPathInput = {
  courseIds: Array<Scalars['ID']['input']>;
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  priority?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
};

/**
 * Input for updating a lesson.
 * Enables updates to an existing lesson's content and metadata.
 */
export type UpdateLessonInput = {
  content?: InputMaybe<ContentInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  metadata?: InputMaybe<LessonMetadataInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/**
 * Input for updating a module.
 * Enables updates to an existing module's details, such as its title, description, and learning objectives.
 */
export type UpdateModuleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  learningObjectives?: InputMaybe<Array<Scalars['String']['input']>>;
  metadata?: InputMaybe<ModuleMetadataInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/**
 * Input for updating progress.
 * Allows for updates to an enrollment's progress, including completed items and time spent.
 */
export type UpdateProgressInput = {
  completedItems: Array<Scalars['ID']['input']>;
  enrollmentId: Scalars['ID']['input'];
  progress: Scalars['Float']['input'];
  timeSpent: Scalars['Int']['input'];
};

/** Input for uploading new content with comprehensive fields. Content uploads are used to add new content to the system, including title, description, type, file, URL, data, duration, thumbnail, interactivity type, format, language, and accessibility. */
export type UploadContentInput = {
  accessibility?: InputMaybe<AccessibilityInput>;
  data?: InputMaybe<Scalars['JSONObject']['input']>;
  description: Scalars['String']['input'];
  duration?: InputMaybe<Scalars['Int']['input']>;
  file?: InputMaybe<Scalars['Upload']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  interactivityType?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<ContentMetadataInput>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  type: ContentType;
  url?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

/**
 * Represents a user in the system.
 * Users are individuals who interact with the platform, either as learners, instructors, or administrators.
 * They have roles that define their permissions and access levels within the system.
 */
export type User = Auditable & Node & {
  __typename?: 'User';
  achievements: Array<Achievement>;
  auditLog: Array<AuditEntry>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  email: Scalars['EmailAddress']['output'];
  enrollments: Array<Enrollment>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  preferences: UserPreferences;
  role: UserRole;
  skills: Array<UserSkill>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  version: Scalars['Int']['output'];
};

/**
 * Represents user preferences.
 * User preferences store individual settings for language, notifications, and other customizable options within the platform.
 */
export type UserPreferences = {
  __typename?: 'UserPreferences';
  emailNotifications: Scalars['Boolean']['output'];
  language: Scalars['String']['output'];
  pushNotifications: Scalars['Boolean']['output'];
  themePreference: Scalars['String']['output'];
  timezone: Scalars['String']['output'];
};

/**
 * Enum for user roles.
 * User roles define the permissions and access levels of users within the system, determining their capabilities and responsibilities.
 */
export enum UserRole {
  Admin = 'ADMIN',
  ContentManager = 'CONTENT_MANAGER',
  Instructor = 'INSTRUCTOR',
  Moderator = 'MODERATOR',
  Student = 'STUDENT'
}

/**
 * Represents a user's skill level.
 * User skills track the proficiency levels of learners in specific skills, including endorsements and verification status.
 */
export type UserSkill = {
  __typename?: 'UserSkill';
  endorsements: Scalars['Int']['output'];
  level: DifficultyLevel;
  skill: Skill;
  verifiedAt?: Maybe<Scalars['DateTime']['output']>;
};

/**
 * Represents validation configuration.
 * Validation configurations specify the rules and criteria for ensuring data quality and compliance within the platform.
 */
export type ValidationConfig = {
  __typename?: 'ValidationConfig';
  customValidation?: Maybe<Scalars['JSONObject']['output']>;
  rules: Array<ValidationRule>;
  severity: WarningSeverity;
};

/**
 * Base type for validation errors.
 * Validation errors highlight issues with data validation, including error codes, messages, and severity levels, helping to ensure data integrity.
 */
export type ValidationError = Error & {
  __typename?: 'ValidationError';
  code: Scalars['String']['output'];
  details?: Maybe<Scalars['JSONObject']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  severity: WarningSeverity;
  validationType: Scalars['String']['output'];
};

/**
 * Represents a validation rule.
 * Validation rules define specific conditions that data must meet to be considered valid, including severity levels and custom messages.
 */
export type ValidationRule = {
  __typename?: 'ValidationRule';
  condition: Scalars['String']['output'];
  message: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  name: Scalars['String']['output'];
  severity: WarningSeverity;
};

/** Configuration for validation rules. Validation rules are used to validate content, ensuring it meets specific criteria or standards. */
export type ValidationRuleConfig = {
  __typename?: 'ValidationRuleConfig';
  customValidation?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  parameters?: Maybe<Scalars['JSONObject']['output']>;
  severity: WarningSeverity;
};

/**
 * Enum for warning severity levels.
 * Warning severity levels classify the seriousness of warnings generated during validation or processing, guiding appropriate responses.
 */
export enum WarningSeverity {
  Critical = 'CRITICAL',
  Error = 'ERROR',
  Info = 'INFO',
  Warning = 'WARNING'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = ResolversObject<{
  AccessControlled: ( Course ) | ( Lesson );
  Auditable: ( Assessment ) | ( Course ) | ( Lesson ) | ( Module ) | ( User );
  Error: ( OperationError ) | ( ProcessingError ) | ( ValidationError );
  Metadata: never;
  Node: ( Achievement ) | ( Assessment ) | ( AuditEntry ) | ( Course ) | ( Enrollment ) | ( Instructor ) | ( LearningPath ) | ( Lesson ) | ( Module ) | ( Review ) | ( User );
  Searchable: ( Course ) | ( Lesson ) | ( Module );
  Trackable: ( Enrollment );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AccessControlled: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['AccessControlled']>;
  AccessLevel: AccessLevel;
  AccessibilityInfo: ResolverTypeWrapper<AccessibilityInfo>;
  AccessibilityInput: AccessibilityInput;
  Achievement: ResolverTypeWrapper<Achievement>;
  AchievementType: AchievementType;
  Assessment: ResolverTypeWrapper<Assessment>;
  AssessmentAnswer: AssessmentAnswer;
  AssessmentError: ResolverTypeWrapper<AssessmentError>;
  AssessmentMetadata: ResolverTypeWrapper<AssessmentMetadata>;
  AssessmentPayload: ResolverTypeWrapper<AssessmentPayload>;
  AssessmentResult: ResolverTypeWrapper<AssessmentResult>;
  AssessmentResultPayload: ResolverTypeWrapper<AssessmentResultPayload>;
  AssessmentStats: ResolverTypeWrapper<AssessmentStats>;
  AssessmentStatus: AssessmentStatus;
  AssessmentType: AssessmentType;
  AuditChange: ResolverTypeWrapper<AuditChange>;
  AuditEntry: ResolverTypeWrapper<AuditEntry>;
  Auditable: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Auditable']>;
  BaseContentInput: BaseContentInput;
  BaseMetadataInput: BaseMetadataInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Certificate: ResolverTypeWrapper<Certificate>;
  CertificateError: ResolverTypeWrapper<CertificateError>;
  CertificateMetadata: ResolverTypeWrapper<CertificateMetadata>;
  CertificatePayload: ResolverTypeWrapper<CertificatePayload>;
  CertificateStatus: CertificateStatus;
  CertificateType: CertificateType;
  CertificateValidationPayload: ResolverTypeWrapper<CertificateValidationPayload>;
  CertificationType: CertificationType;
  CompletionRate: ResolverTypeWrapper<CompletionRate>;
  CompletionRateRange: ResolverTypeWrapper<CompletionRateRange>;
  Content: ResolverTypeWrapper<Content>;
  ContentError: ResolverTypeWrapper<ContentError>;
  ContentInput: ContentInput;
  ContentMetadata: ResolverTypeWrapper<ContentMetadata>;
  ContentMetadataInput: ContentMetadataInput;
  ContentPayload: ResolverTypeWrapper<ContentPayload>;
  ContentProcessingResult: ResolverTypeWrapper<ContentProcessingResult>;
  ContentProgressInput: ContentProgressInput;
  ContentStatus: ContentStatus;
  ContentType: ContentType;
  ContentValidation: ResolverTypeWrapper<ContentValidation>;
  ContentValidationError: ResolverTypeWrapper<ContentValidationError>;
  ContentValidationPayload: ResolverTypeWrapper<ContentValidationPayload>;
  ContentValidationWarning: ResolverTypeWrapper<ContentValidationWarning>;
  Course: ResolverTypeWrapper<Course>;
  CourseAggregations: ResolverTypeWrapper<CourseAggregations>;
  CourseAnalytics: ResolverTypeWrapper<CourseAnalytics>;
  CourseConnection: ResolverTypeWrapper<CourseConnection>;
  CourseEdge: ResolverTypeWrapper<CourseEdge>;
  CourseError: ResolverTypeWrapper<CourseError>;
  CourseMetadata: ResolverTypeWrapper<CourseMetadata>;
  CourseMetadataInput: CourseMetadataInput;
  CoursePayload: ResolverTypeWrapper<CoursePayload>;
  CourseSearchFilter: CourseSearchFilter;
  CourseUpdate: ResolverTypeWrapper<CourseUpdate>;
  CourseUpdateType: CourseUpdateType;
  CreateAssessmentInput: CreateAssessmentInput;
  CreateCourseInput: CreateCourseInput;
  CreateEnrollmentInput: CreateEnrollmentInput;
  CreateLessonInput: CreateLessonInput;
  CreateModuleInput: CreateModuleInput;
  DateRangeInput: DateRangeInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DifficultyCount: ResolverTypeWrapper<DifficultyCount>;
  DifficultyLevel: DifficultyLevel;
  DurationRangeInput: DurationRangeInput;
  DurationUnit: DurationUnit;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  EngagementMetrics: ResolverTypeWrapper<EngagementMetrics>;
  Enrollment: ResolverTypeWrapper<Enrollment>;
  EnrollmentConnection: ResolverTypeWrapper<EnrollmentConnection>;
  EnrollmentEdge: ResolverTypeWrapper<EnrollmentEdge>;
  EnrollmentError: ResolverTypeWrapper<EnrollmentError>;
  EnrollmentMetadata: ResolverTypeWrapper<EnrollmentMetadata>;
  EnrollmentPayload: ResolverTypeWrapper<EnrollmentPayload>;
  EnrollmentProgress: ResolverTypeWrapper<EnrollmentProgress>;
  EnrollmentRange: ResolverTypeWrapper<EnrollmentRange>;
  Error: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Error']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GenerationConfig: ResolverTypeWrapper<GenerationConfig>;
  GradeAssessmentInput: GradeAssessmentInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Instructor: ResolverTypeWrapper<Instructor>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']['output']>;
  LearningPath: ResolverTypeWrapper<LearningPath>;
  LearningPathError: ResolverTypeWrapper<LearningPathError>;
  LearningPathPayload: ResolverTypeWrapper<LearningPathPayload>;
  Lesson: ResolverTypeWrapper<Lesson>;
  LessonConnection: ResolverTypeWrapper<LessonConnection>;
  LessonEdge: ResolverTypeWrapper<LessonEdge>;
  LessonError: ResolverTypeWrapper<LessonError>;
  LessonMetadata: ResolverTypeWrapper<LessonMetadata>;
  LessonMetadataInput: LessonMetadataInput;
  LessonPayload: ResolverTypeWrapper<LessonPayload>;
  LoginInput: LoginInput;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  Metadata: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Metadata']>;
  Module: ResolverTypeWrapper<Module>;
  ModuleConnection: ResolverTypeWrapper<ModuleConnection>;
  ModuleEdge: ResolverTypeWrapper<ModuleEdge>;
  ModuleError: ResolverTypeWrapper<ModuleError>;
  ModuleMetadata: ResolverTypeWrapper<ModuleMetadata>;
  ModuleMetadataInput: ModuleMetadataInput;
  ModulePayload: ResolverTypeWrapper<ModulePayload>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  OperationError: ResolverTypeWrapper<OperationError>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PaginationInput: PaginationInput;
  PriceRangeInput: PriceRangeInput;
  ProcessingError: ResolverTypeWrapper<ProcessingError>;
  Progress: ResolverTypeWrapper<Progress>;
  ProgressError: ResolverTypeWrapper<ProgressError>;
  ProgressMetadata: ResolverTypeWrapper<ProgressMetadata>;
  ProgressPayload: ResolverTypeWrapper<ProgressPayload>;
  ProgressStatus: ProgressStatus;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<Question>;
  QuestionInput: QuestionInput;
  QuestionOption: ResolverTypeWrapper<QuestionOption>;
  QuestionOptionInput: QuestionOptionInput;
  QuestionType: QuestionType;
  RatingRange: ResolverTypeWrapper<RatingRange>;
  RevenueMetrics: ResolverTypeWrapper<RevenueMetrics>;
  RevenuePeriod: ResolverTypeWrapper<RevenuePeriod>;
  Review: ResolverTypeWrapper<Review>;
  RichText: ResolverTypeWrapper<Scalars['RichText']['output']>;
  Rubric: ResolverTypeWrapper<Rubric>;
  RubricCriterion: ResolverTypeWrapper<RubricCriterion>;
  RubricCriterionInput: RubricCriterionInput;
  RubricInput: RubricInput;
  RubricLevel: ResolverTypeWrapper<RubricLevel>;
  RubricLevelInput: RubricLevelInput;
  RubricScore: ResolverTypeWrapper<RubricScore>;
  RubricScoreInput: RubricScoreInput;
  ScheduleCourseInput: ScheduleCourseInput;
  Searchable: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Searchable']>;
  Skill: ResolverTypeWrapper<Skill>;
  StatusCount: ResolverTypeWrapper<StatusCount>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SubmitAssessmentInput: SubmitAssessmentInput;
  Subscriber: ResolverTypeWrapper<Subscriber>;
  SubscriberDetails: ResolverTypeWrapper<SubscriberDetails>;
  SubscriberDetailsInput: SubscriberDetailsInput;
  Subscription: ResolverTypeWrapper<{}>;
  TimeSeriesData: ResolverTypeWrapper<TimeSeriesData>;
  Trackable: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Trackable']>;
  TransferEnrollmentInput: TransferEnrollmentInput;
  TrendDirection: TrendDirection;
  TrendsData: ResolverTypeWrapper<TrendsData>;
  URL: ResolverTypeWrapper<Scalars['URL']['output']>;
  UpdateAssessmentInput: UpdateAssessmentInput;
  UpdateContentInput: UpdateContentInput;
  UpdateCourseInput: UpdateCourseInput;
  UpdateLearningPathInput: UpdateLearningPathInput;
  UpdateLessonInput: UpdateLessonInput;
  UpdateModuleInput: UpdateModuleInput;
  UpdateProgressInput: UpdateProgressInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  UploadContentInput: UploadContentInput;
  User: ResolverTypeWrapper<User>;
  UserPreferences: ResolverTypeWrapper<UserPreferences>;
  UserRole: UserRole;
  UserSkill: ResolverTypeWrapper<UserSkill>;
  ValidationConfig: ResolverTypeWrapper<ValidationConfig>;
  ValidationError: ResolverTypeWrapper<ValidationError>;
  ValidationRule: ResolverTypeWrapper<ValidationRule>;
  ValidationRuleConfig: ResolverTypeWrapper<ValidationRuleConfig>;
  WarningSeverity: WarningSeverity;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AccessControlled: ResolversInterfaceTypes<ResolversParentTypes>['AccessControlled'];
  AccessibilityInfo: AccessibilityInfo;
  AccessibilityInput: AccessibilityInput;
  Achievement: Achievement;
  Assessment: Assessment;
  AssessmentAnswer: AssessmentAnswer;
  AssessmentError: AssessmentError;
  AssessmentMetadata: AssessmentMetadata;
  AssessmentPayload: AssessmentPayload;
  AssessmentResult: AssessmentResult;
  AssessmentResultPayload: AssessmentResultPayload;
  AssessmentStats: AssessmentStats;
  AuditChange: AuditChange;
  AuditEntry: AuditEntry;
  Auditable: ResolversInterfaceTypes<ResolversParentTypes>['Auditable'];
  BaseContentInput: BaseContentInput;
  BaseMetadataInput: BaseMetadataInput;
  Boolean: Scalars['Boolean']['output'];
  Certificate: Certificate;
  CertificateError: CertificateError;
  CertificateMetadata: CertificateMetadata;
  CertificatePayload: CertificatePayload;
  CertificateValidationPayload: CertificateValidationPayload;
  CompletionRate: CompletionRate;
  CompletionRateRange: CompletionRateRange;
  Content: Content;
  ContentError: ContentError;
  ContentInput: ContentInput;
  ContentMetadata: ContentMetadata;
  ContentMetadataInput: ContentMetadataInput;
  ContentPayload: ContentPayload;
  ContentProcessingResult: ContentProcessingResult;
  ContentProgressInput: ContentProgressInput;
  ContentValidation: ContentValidation;
  ContentValidationError: ContentValidationError;
  ContentValidationPayload: ContentValidationPayload;
  ContentValidationWarning: ContentValidationWarning;
  Course: Course;
  CourseAggregations: CourseAggregations;
  CourseAnalytics: CourseAnalytics;
  CourseConnection: CourseConnection;
  CourseEdge: CourseEdge;
  CourseError: CourseError;
  CourseMetadata: CourseMetadata;
  CourseMetadataInput: CourseMetadataInput;
  CoursePayload: CoursePayload;
  CourseSearchFilter: CourseSearchFilter;
  CourseUpdate: CourseUpdate;
  CreateAssessmentInput: CreateAssessmentInput;
  CreateCourseInput: CreateCourseInput;
  CreateEnrollmentInput: CreateEnrollmentInput;
  CreateLessonInput: CreateLessonInput;
  CreateModuleInput: CreateModuleInput;
  DateRangeInput: DateRangeInput;
  DateTime: Scalars['DateTime']['output'];
  DifficultyCount: DifficultyCount;
  DurationRangeInput: DurationRangeInput;
  EmailAddress: Scalars['EmailAddress']['output'];
  EngagementMetrics: EngagementMetrics;
  Enrollment: Enrollment;
  EnrollmentConnection: EnrollmentConnection;
  EnrollmentEdge: EnrollmentEdge;
  EnrollmentError: EnrollmentError;
  EnrollmentMetadata: EnrollmentMetadata;
  EnrollmentPayload: EnrollmentPayload;
  EnrollmentProgress: EnrollmentProgress;
  EnrollmentRange: EnrollmentRange;
  Error: ResolversInterfaceTypes<ResolversParentTypes>['Error'];
  Float: Scalars['Float']['output'];
  GenerationConfig: GenerationConfig;
  GradeAssessmentInput: GradeAssessmentInput;
  ID: Scalars['ID']['output'];
  Instructor: Instructor;
  Int: Scalars['Int']['output'];
  JSONObject: Scalars['JSONObject']['output'];
  LearningPath: LearningPath;
  LearningPathError: LearningPathError;
  LearningPathPayload: LearningPathPayload;
  Lesson: Lesson;
  LessonConnection: LessonConnection;
  LessonEdge: LessonEdge;
  LessonError: LessonError;
  LessonMetadata: LessonMetadata;
  LessonMetadataInput: LessonMetadataInput;
  LessonPayload: LessonPayload;
  LoginInput: LoginInput;
  LoginResponse: LoginResponse;
  Metadata: ResolversInterfaceTypes<ResolversParentTypes>['Metadata'];
  Module: Module;
  ModuleConnection: ModuleConnection;
  ModuleEdge: ModuleEdge;
  ModuleError: ModuleError;
  ModuleMetadata: ModuleMetadata;
  ModuleMetadataInput: ModuleMetadataInput;
  ModulePayload: ModulePayload;
  Mutation: {};
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  OperationError: OperationError;
  PageInfo: PageInfo;
  PaginationInput: PaginationInput;
  PriceRangeInput: PriceRangeInput;
  ProcessingError: ProcessingError;
  Progress: Progress;
  ProgressError: ProgressError;
  ProgressMetadata: ProgressMetadata;
  ProgressPayload: ProgressPayload;
  Query: {};
  Question: Question;
  QuestionInput: QuestionInput;
  QuestionOption: QuestionOption;
  QuestionOptionInput: QuestionOptionInput;
  RatingRange: RatingRange;
  RevenueMetrics: RevenueMetrics;
  RevenuePeriod: RevenuePeriod;
  Review: Review;
  RichText: Scalars['RichText']['output'];
  Rubric: Rubric;
  RubricCriterion: RubricCriterion;
  RubricCriterionInput: RubricCriterionInput;
  RubricInput: RubricInput;
  RubricLevel: RubricLevel;
  RubricLevelInput: RubricLevelInput;
  RubricScore: RubricScore;
  RubricScoreInput: RubricScoreInput;
  ScheduleCourseInput: ScheduleCourseInput;
  Searchable: ResolversInterfaceTypes<ResolversParentTypes>['Searchable'];
  Skill: Skill;
  StatusCount: StatusCount;
  String: Scalars['String']['output'];
  SubmitAssessmentInput: SubmitAssessmentInput;
  Subscriber: Subscriber;
  SubscriberDetails: SubscriberDetails;
  SubscriberDetailsInput: SubscriberDetailsInput;
  Subscription: {};
  TimeSeriesData: TimeSeriesData;
  Trackable: ResolversInterfaceTypes<ResolversParentTypes>['Trackable'];
  TransferEnrollmentInput: TransferEnrollmentInput;
  TrendsData: TrendsData;
  URL: Scalars['URL']['output'];
  UpdateAssessmentInput: UpdateAssessmentInput;
  UpdateContentInput: UpdateContentInput;
  UpdateCourseInput: UpdateCourseInput;
  UpdateLearningPathInput: UpdateLearningPathInput;
  UpdateLessonInput: UpdateLessonInput;
  UpdateModuleInput: UpdateModuleInput;
  UpdateProgressInput: UpdateProgressInput;
  Upload: Scalars['Upload']['output'];
  UploadContentInput: UploadContentInput;
  User: User;
  UserPreferences: UserPreferences;
  UserSkill: UserSkill;
  ValidationConfig: ValidationConfig;
  ValidationError: ValidationError;
  ValidationRule: ValidationRule;
  ValidationRuleConfig: ValidationRuleConfig;
}>;

export type AccessControlledResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AccessControlled'] = ResolversParentTypes['AccessControlled']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Course' | 'Lesson', ParentType, ContextType>;
  accessGroups?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  accessLevel?: Resolver<ResolversTypes['AccessLevel'], ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
}>;

export type AccessibilityInfoResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AccessibilityInfo'] = ResolversParentTypes['AccessibilityInfo']> = ResolversObject<{
  hasAudioDescription?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasClosedCaptions?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasSignLanguage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasTranscript?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  languages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  wcagLevel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AchievementResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Achievement'] = ResolversParentTypes['Achievement']> = ResolversObject<{
  awardedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  criteria?: Resolver<ResolversTypes['JSONObject'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AchievementType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AssessmentResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Assessment'] = ResolversParentTypes['Assessment']> = ResolversObject<{
  auditLog?: Resolver<Array<ResolversTypes['AuditEntry']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maxAttempts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['AssessmentMetadata'], ParentType, ContextType>;
  passingScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  questions?: Resolver<Array<ResolversTypes['Question']>, ParentType, ContextType>;
  rubric?: Resolver<Maybe<ResolversTypes['Rubric']>, ParentType, ContextType>;
  timeLimit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AssessmentType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AssessmentErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AssessmentError'] = ResolversParentTypes['AssessmentError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AssessmentMetadataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AssessmentMetadata'] = ResolversParentTypes['AssessmentMetadata']> = ResolversObject<{
  customFields?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  gradeScale?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  reviewers?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  submissionGuidelines?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AssessmentPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AssessmentPayload'] = ResolversParentTypes['AssessmentPayload']> = ResolversObject<{
  assessment?: Resolver<Maybe<ResolversTypes['Assessment']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['AssessmentError']>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AssessmentResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AssessmentResult'] = ResolversParentTypes['AssessmentResult']> = ResolversObject<{
  assessment?: Resolver<ResolversTypes['Assessment'], ParentType, ContextType>;
  attemptNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  completedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  enrollment?: Resolver<ResolversTypes['Enrollment'], ParentType, ContextType>;
  feedback?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gradedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  passed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  rubricScores?: Resolver<Maybe<Array<ResolversTypes['RubricScore']>>, ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  startedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AssessmentResultPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AssessmentResultPayload'] = ResolversParentTypes['AssessmentResultPayload']> = ResolversObject<{
  errors?: Resolver<Maybe<Array<ResolversTypes['AssessmentError']>>, ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['AssessmentResult']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AssessmentStatsResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AssessmentStats'] = ResolversParentTypes['AssessmentStats']> = ResolversObject<{
  averageAttempts?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  averageScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  passRate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  submissionRate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuditChangeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuditChange'] = ResolversParentTypes['AuditChange']> = ResolversObject<{
  changeType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  newValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  previousValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuditEntryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuditEntry'] = ResolversParentTypes['AuditEntry']> = ResolversObject<{
  action?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<Maybe<Array<ResolversTypes['AuditChange']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  entityId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  entityType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ipAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  sessionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userAgent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuditableResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Auditable'] = ResolversParentTypes['Auditable']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Assessment' | 'Course' | 'Lesson' | 'Module' | 'User', ParentType, ContextType>;
  auditLog?: Resolver<Array<ResolversTypes['AuditEntry']>, ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type CertificateResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Certificate'] = ResolversParentTypes['Certificate']> = ResolversObject<{
  course?: Resolver<ResolversTypes['Course'], ParentType, ContextType>;
  expiresAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuedTo?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  issuer?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['CertificateMetadata'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['CertificateStatus'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['CertificationType'], ParentType, ContextType>;
  validationHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CertificateErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CertificateError'] = ResolversParentTypes['CertificateError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CertificateMetadataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CertificateMetadata'] = ResolversParentTypes['CertificateMetadata']> = ResolversObject<{
  customFields?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  issuerInfo?: Resolver<ResolversTypes['JSONObject'], ParentType, ContextType>;
  serialNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  templateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verificationUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CertificatePayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CertificatePayload'] = ResolversParentTypes['CertificatePayload']> = ResolversObject<{
  certificate?: Resolver<Maybe<ResolversTypes['Certificate']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['CertificateError']>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CertificateValidationPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CertificateValidationPayload'] = ResolversParentTypes['CertificateValidationPayload']> = ResolversObject<{
  certificate?: Resolver<Maybe<ResolversTypes['Certificate']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['CertificateError']>>, ParentType, ContextType>;
  isValid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  validationDetails?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CompletionRateResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CompletionRate'] = ResolversParentTypes['CompletionRate']> = ResolversObject<{
  averageTimeSpent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contentId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CompletionRateRangeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CompletionRateRange'] = ResolversParentTypes['CompletionRateRange']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  courses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType>;
  max?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  min?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContentResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Content'] = ResolversParentTypes['Content']> = ResolversObject<{
  accessibility?: Resolver<Maybe<ResolversTypes['AccessibilityInfo']>, ParentType, ContextType>;
  data?: Resolver<ResolversTypes['JSONObject'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  format?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  interactivityType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['ContentMetadata'], ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ContentType'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContentErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ContentError'] = ResolversParentTypes['ContentError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContentMetadataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ContentMetadata'] = ResolversParentTypes['ContentMetadata']> = ResolversObject<{
  customFields?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  lastSynced?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  sourceSystem?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  technicalDetails?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContentPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ContentPayload'] = ResolversParentTypes['ContentPayload']> = ResolversObject<{
  content?: Resolver<Maybe<ResolversTypes['Content']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ContentError']>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContentProcessingResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ContentProcessingResult'] = ResolversParentTypes['ContentProcessingResult']> = ResolversObject<{
  metadata?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  outputUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  processingTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  transformations?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContentValidationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ContentValidation'] = ResolversParentTypes['ContentValidation']> = ResolversObject<{
  errors?: Resolver<Maybe<Array<ResolversTypes['ContentValidationError']>>, ParentType, ContextType>;
  isValid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  warnings?: Resolver<Maybe<Array<ResolversTypes['ContentValidationWarning']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContentValidationErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ContentValidationError'] = ResolversParentTypes['ContentValidationError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContentValidationPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ContentValidationPayload'] = ResolversParentTypes['ContentValidationPayload']> = ResolversObject<{
  errors?: Resolver<Maybe<Array<ResolversTypes['ContentError']>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  validation?: Resolver<Maybe<ResolversTypes['ContentValidation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContentValidationWarningResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ContentValidationWarning'] = ResolversParentTypes['ContentValidationWarning']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  severity?: Resolver<ResolversTypes['WarningSeverity'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CourseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Course'] = ResolversParentTypes['Course']> = ResolversObject<{
  accessGroups?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  accessLevel?: Resolver<ResolversTypes['AccessLevel'], ParentType, ContextType>;
  analytics?: Resolver<ResolversTypes['CourseAnalytics'], ParentType, ContextType>;
  assessments?: Resolver<Array<ResolversTypes['Assessment']>, ParentType, ContextType>;
  auditLog?: Resolver<Array<ResolversTypes['AuditEntry']>, ParentType, ContextType>;
  certificate?: Resolver<Maybe<ResolversTypes['Certificate']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  difficultyLevel?: Resolver<ResolversTypes['DifficultyLevel'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  enrollments?: Resolver<Array<ResolversTypes['Enrollment']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  instructors?: Resolver<Array<ResolversTypes['Instructor']>, ParentType, ContextType>;
  learningObjectives?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['CourseMetadata'], ParentType, ContextType>;
  modules?: Resolver<Array<ResolversTypes['Module']>, ParentType, ContextType>;
  prerequisites?: Resolver<Maybe<Array<ResolversTypes['Course']>>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>;
  searchMetadata?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  skills?: Resolver<Array<ResolversTypes['Skill']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ContentStatus'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CourseAggregationsResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CourseAggregations'] = ResolversParentTypes['CourseAggregations']> = ResolversObject<{
  byCompletionRate?: Resolver<Array<ResolversTypes['CompletionRateRange']>, ParentType, ContextType>;
  byDifficulty?: Resolver<Array<ResolversTypes['DifficultyCount']>, ParentType, ContextType>;
  byEnrollmentCount?: Resolver<Array<ResolversTypes['EnrollmentRange']>, ParentType, ContextType>;
  byRating?: Resolver<Array<ResolversTypes['RatingRange']>, ParentType, ContextType>;
  byStatus?: Resolver<Array<ResolversTypes['StatusCount']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CourseAnalyticsResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CourseAnalytics'] = ResolversParentTypes['CourseAnalytics']> = ResolversObject<{
  activeEnrollments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  assessmentStats?: Resolver<ResolversTypes['AssessmentStats'], ParentType, ContextType>;
  averageProgress?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  averageTimeToComplete?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  completionRate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  dropoutRate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  engagementMetrics?: Resolver<ResolversTypes['EngagementMetrics'], ParentType, ContextType>;
  revenueMetrics?: Resolver<Maybe<ResolversTypes['RevenueMetrics']>, ParentType, ContextType>;
  totalEnrollments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trendsData?: Resolver<ResolversTypes['TrendsData'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CourseConnectionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CourseConnection'] = ResolversParentTypes['CourseConnection']> = ResolversObject<{
  aggregations?: Resolver<Maybe<ResolversTypes['CourseAggregations']>, ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['CourseEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CourseEdgeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CourseEdge'] = ResolversParentTypes['CourseEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Course'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CourseErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CourseError'] = ResolversParentTypes['CourseError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CourseMetadataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CourseMetadata'] = ResolversParentTypes['CourseMetadata']> = ResolversObject<{
  certificationTrack?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  customFields?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  estimatedDuration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  requirements?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  skillLevel?: Resolver<ResolversTypes['DifficultyLevel'], ParentType, ContextType>;
  targetAudience?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CoursePayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CoursePayload'] = ResolversParentTypes['CoursePayload']> = ResolversObject<{
  course?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['CourseError']>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CourseUpdateResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CourseUpdate'] = ResolversParentTypes['CourseUpdate']> = ResolversObject<{
  course?: Resolver<ResolversTypes['Course'], ParentType, ContextType>;
  updateType?: Resolver<ResolversTypes['CourseUpdateType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedFields?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DifficultyCountResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['DifficultyCount'] = ResolversParentTypes['DifficultyCount']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  difficulty?: Resolver<ResolversTypes['DifficultyLevel'], ParentType, ContextType>;
  percentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type EngagementMetricsResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['EngagementMetrics'] = ResolversParentTypes['EngagementMetrics']> = ResolversObject<{
  averageSessionDuration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  averageSessionsPerUser?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  contentCompletionRates?: Resolver<Array<ResolversTypes['CompletionRate']>, ParentType, ContextType>;
  discussionParticipationRate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnrollmentResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Enrollment'] = ResolversParentTypes['Enrollment']> = ResolversObject<{
  assessmentResults?: Resolver<Array<ResolversTypes['AssessmentResult']>, ParentType, ContextType>;
  certificate?: Resolver<Maybe<ResolversTypes['Certificate']>, ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  completionDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  course?: Resolver<ResolversTypes['Course'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastAccessedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['EnrollmentMetadata'], ParentType, ContextType>;
  progress?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  startedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ProgressStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnrollmentConnectionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['EnrollmentConnection'] = ResolversParentTypes['EnrollmentConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['EnrollmentEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnrollmentEdgeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['EnrollmentEdge'] = ResolversParentTypes['EnrollmentEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Enrollment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnrollmentErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['EnrollmentError'] = ResolversParentTypes['EnrollmentError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnrollmentMetadataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['EnrollmentMetadata'] = ResolversParentTypes['EnrollmentMetadata']> = ResolversObject<{
  customFields?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  enrollmentSource?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentInfo?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  promotionalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnrollmentPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['EnrollmentPayload'] = ResolversParentTypes['EnrollmentPayload']> = ResolversObject<{
  enrollment?: Resolver<Maybe<ResolversTypes['Enrollment']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['EnrollmentError']>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnrollmentProgressResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['EnrollmentProgress'] = ResolversParentTypes['EnrollmentProgress']> = ResolversObject<{
  completedItems?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  currentProgress?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  enrollment?: Resolver<ResolversTypes['Enrollment'], ParentType, ContextType>;
  previousProgress?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnrollmentRangeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['EnrollmentRange'] = ResolversParentTypes['EnrollmentRange']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  courses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType>;
  max?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  min?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = ResolversObject<{
  __resolveType: TypeResolveFn<'OperationError' | 'ProcessingError' | 'ValidationError', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type GenerationConfigResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['GenerationConfig'] = ResolversParentTypes['GenerationConfig']> = ResolversObject<{
  format?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  parameters?: Resolver<ResolversTypes['JSONObject'], ParentType, ContextType>;
  template?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  validation?: Resolver<ResolversTypes['ValidationConfig'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InstructorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Instructor'] = ResolversParentTypes['Instructor']> = ResolversObject<{
  biography?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  courses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  expertise?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type LearningPathResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['LearningPath'] = ResolversParentTypes['LearningPath']> = ResolversObject<{
  courses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  difficulty?: Resolver<ResolversTypes['DifficultyLevel'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  prerequisites?: Resolver<Maybe<Array<ResolversTypes['LearningPath']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LearningPathErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['LearningPathError'] = ResolversParentTypes['LearningPathError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LearningPathPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['LearningPathPayload'] = ResolversParentTypes['LearningPathPayload']> = ResolversObject<{
  errors?: Resolver<Maybe<Array<ResolversTypes['LearningPathError']>>, ParentType, ContextType>;
  learningPath?: Resolver<Maybe<ResolversTypes['LearningPath']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LessonResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Lesson'] = ResolversParentTypes['Lesson']> = ResolversObject<{
  accessGroups?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  accessLevel?: Resolver<ResolversTypes['AccessLevel'], ParentType, ContextType>;
  assessments?: Resolver<Array<ResolversTypes['Assessment']>, ParentType, ContextType>;
  auditLog?: Resolver<Array<ResolversTypes['AuditEntry']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['Content'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['LessonMetadata'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  prerequisites?: Resolver<Maybe<Array<ResolversTypes['Lesson']>>, ParentType, ContextType>;
  searchMetadata?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ContentStatus'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ContentType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LessonConnectionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['LessonConnection'] = ResolversParentTypes['LessonConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['LessonEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LessonEdgeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['LessonEdge'] = ResolversParentTypes['LessonEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Lesson'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LessonErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['LessonError'] = ResolversParentTypes['LessonError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LessonMetadataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['LessonMetadata'] = ResolversParentTypes['LessonMetadata']> = ResolversObject<{
  customFields?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  interactivityLevel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resourceType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  technicalRequirements?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LessonPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['LessonPayload'] = ResolversParentTypes['LessonPayload']> = ResolversObject<{
  errors?: Resolver<Maybe<Array<ResolversTypes['LessonError']>>, ParentType, ContextType>;
  lesson?: Resolver<Maybe<ResolversTypes['Lesson']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoginResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MetadataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Metadata'] = ResolversParentTypes['Metadata']> = ResolversObject<{
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  customFields?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type ModuleResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Module'] = ResolversParentTypes['Module']> = ResolversObject<{
  auditLog?: Resolver<Array<ResolversTypes['AuditEntry']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  learningObjectives?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  lessons?: Resolver<Array<ResolversTypes['Lesson']>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['ModuleMetadata'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  prerequisites?: Resolver<Maybe<Array<ResolversTypes['Module']>>, ParentType, ContextType>;
  searchMetadata?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ContentStatus'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ModuleConnectionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ModuleConnection'] = ResolversParentTypes['ModuleConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['ModuleEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ModuleEdgeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ModuleEdge'] = ResolversParentTypes['ModuleEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Module'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ModuleErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ModuleError'] = ResolversParentTypes['ModuleError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ModuleMetadataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ModuleMetadata'] = ResolversParentTypes['ModuleMetadata']> = ResolversObject<{
  customFields?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  estimatedDuration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  learningObjectives?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  resourceCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ModulePayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ModulePayload'] = ResolversParentTypes['ModulePayload']> = ResolversObject<{
  errors?: Resolver<Maybe<Array<ResolversTypes['ModuleError']>>, ParentType, ContextType>;
  module?: Resolver<Maybe<ResolversTypes['Module']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  archiveContent?: Resolver<ResolversTypes['ContentPayload'], ParentType, ContextType, RequireFields<MutationArchiveContentArgs, 'id'>>;
  archiveCourse?: Resolver<ResolversTypes['CoursePayload'], ParentType, ContextType, RequireFields<MutationArchiveCourseArgs, 'id'>>;
  archiveLesson?: Resolver<ResolversTypes['LessonPayload'], ParentType, ContextType, RequireFields<MutationArchiveLessonArgs, 'id'>>;
  archiveModule?: Resolver<ResolversTypes['ModulePayload'], ParentType, ContextType, RequireFields<MutationArchiveModuleArgs, 'id'>>;
  createAssessment?: Resolver<ResolversTypes['AssessmentPayload'], ParentType, ContextType, RequireFields<MutationCreateAssessmentArgs, 'input'>>;
  createCourse?: Resolver<ResolversTypes['CoursePayload'], ParentType, ContextType, RequireFields<MutationCreateCourseArgs, 'input'>>;
  createEnrollment?: Resolver<ResolversTypes['EnrollmentPayload'], ParentType, ContextType, RequireFields<MutationCreateEnrollmentArgs, 'input'>>;
  createLesson?: Resolver<ResolversTypes['LessonPayload'], ParentType, ContextType, RequireFields<MutationCreateLessonArgs, 'input'>>;
  createModule?: Resolver<ResolversTypes['ModulePayload'], ParentType, ContextType, RequireFields<MutationCreateModuleArgs, 'input'>>;
  duplicateCourse?: Resolver<ResolversTypes['CoursePayload'], ParentType, ContextType, RequireFields<MutationDuplicateCourseArgs, 'id' | 'newTitle'>>;
  duplicateModule?: Resolver<ResolversTypes['ModulePayload'], ParentType, ContextType, RequireFields<MutationDuplicateModuleArgs, 'courseId' | 'id'>>;
  extendEnrollment?: Resolver<ResolversTypes['EnrollmentPayload'], ParentType, ContextType, RequireFields<MutationExtendEnrollmentArgs, 'extensionDays' | 'id'>>;
  gradeAssessment?: Resolver<ResolversTypes['AssessmentResultPayload'], ParentType, ContextType, RequireFields<MutationGradeAssessmentArgs, 'input'>>;
  issueCertificate?: Resolver<ResolversTypes['CertificatePayload'], ParentType, ContextType, RequireFields<MutationIssueCertificateArgs, 'enrollmentId'>>;
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'credentials'>>;
  markLessonComplete?: Resolver<ResolversTypes['ProgressPayload'], ParentType, ContextType, RequireFields<MutationMarkLessonCompleteArgs, 'enrollmentId' | 'lessonId'>>;
  pauseEnrollment?: Resolver<ResolversTypes['EnrollmentPayload'], ParentType, ContextType, RequireFields<MutationPauseEnrollmentArgs, 'id'>>;
  publishCourse?: Resolver<ResolversTypes['CoursePayload'], ParentType, ContextType, RequireFields<MutationPublishCourseArgs, 'id'>>;
  reopenAssessment?: Resolver<ResolversTypes['AssessmentPayload'], ParentType, ContextType, RequireFields<MutationReopenAssessmentArgs, 'assessmentId' | 'enrollmentId'>>;
  reorderLessons?: Resolver<ResolversTypes['ModulePayload'], ParentType, ContextType, RequireFields<MutationReorderLessonsArgs, 'lessonOrder' | 'moduleId'>>;
  reorderModules?: Resolver<ResolversTypes['CoursePayload'], ParentType, ContextType, RequireFields<MutationReorderModulesArgs, 'courseId' | 'moduleOrder'>>;
  resetProgress?: Resolver<ResolversTypes['ProgressPayload'], ParentType, ContextType, RequireFields<MutationResetProgressArgs, 'enrollmentId' | 'moduleId'>>;
  resumeEnrollment?: Resolver<ResolversTypes['EnrollmentPayload'], ParentType, ContextType, RequireFields<MutationResumeEnrollmentArgs, 'id'>>;
  revokeCertificate?: Resolver<ResolversTypes['CertificatePayload'], ParentType, ContextType, RequireFields<MutationRevokeCertificateArgs, 'certificateId' | 'reason'>>;
  scheduleCourse?: Resolver<ResolversTypes['CoursePayload'], ParentType, ContextType, RequireFields<MutationScheduleCourseArgs, 'input'>>;
  submitAssessment?: Resolver<ResolversTypes['AssessmentPayload'], ParentType, ContextType, RequireFields<MutationSubmitAssessmentArgs, 'input'>>;
  trackContentProgress?: Resolver<ResolversTypes['ProgressPayload'], ParentType, ContextType, RequireFields<MutationTrackContentProgressArgs, 'input'>>;
  transferEnrollment?: Resolver<ResolversTypes['EnrollmentPayload'], ParentType, ContextType, RequireFields<MutationTransferEnrollmentArgs, 'input'>>;
  updateAssessment?: Resolver<ResolversTypes['AssessmentPayload'], ParentType, ContextType, RequireFields<MutationUpdateAssessmentArgs, 'input'>>;
  updateContent?: Resolver<ResolversTypes['ContentPayload'], ParentType, ContextType, RequireFields<MutationUpdateContentArgs, 'input'>>;
  updateCourse?: Resolver<ResolversTypes['CoursePayload'], ParentType, ContextType, RequireFields<MutationUpdateCourseArgs, 'input'>>;
  updateEnrollmentProgress?: Resolver<ResolversTypes['EnrollmentPayload'], ParentType, ContextType, RequireFields<MutationUpdateEnrollmentProgressArgs, 'input'>>;
  updateLearningPath?: Resolver<ResolversTypes['LearningPathPayload'], ParentType, ContextType, RequireFields<MutationUpdateLearningPathArgs, 'input'>>;
  updateLesson?: Resolver<ResolversTypes['LessonPayload'], ParentType, ContextType, RequireFields<MutationUpdateLessonArgs, 'input'>>;
  updateModule?: Resolver<ResolversTypes['ModulePayload'], ParentType, ContextType, RequireFields<MutationUpdateModuleArgs, 'input'>>;
  updateSubscriberDetails?: Resolver<ResolversTypes['Subscriber'], ParentType, ContextType, RequireFields<MutationUpdateSubscriberDetailsArgs, 'details'>>;
  uploadContent?: Resolver<ResolversTypes['ContentPayload'], ParentType, ContextType, RequireFields<MutationUploadContentArgs, 'input'>>;
  validateCertificate?: Resolver<ResolversTypes['CertificateValidationPayload'], ParentType, ContextType, RequireFields<MutationValidateCertificateArgs, 'certificateId'>>;
  validateContent?: Resolver<ResolversTypes['ContentValidationPayload'], ParentType, ContextType, RequireFields<MutationValidateContentArgs, 'id'>>;
}>;

export type NodeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Achievement' | 'Assessment' | 'AuditEntry' | 'Course' | 'Enrollment' | 'Instructor' | 'LearningPath' | 'Lesson' | 'Module' | 'Review' | 'User', ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
}>;

export type OperationErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['OperationError'] = ResolversParentTypes['OperationError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  operation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProcessingErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ProcessingError'] = ResolversParentTypes['ProcessingError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  failurePoint?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  processId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProgressResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Progress'] = ResolversParentTypes['Progress']> = ResolversObject<{
  completedItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  enrollment?: Resolver<ResolversTypes['Enrollment'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastActivity?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  lesson?: Resolver<Maybe<ResolversTypes['Lesson']>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['ProgressMetadata'], ParentType, ContextType>;
  module?: Resolver<Maybe<ResolversTypes['Module']>, ParentType, ContextType>;
  percentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ProgressStatus'], ParentType, ContextType>;
  timeSpent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProgressErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ProgressError'] = ResolversParentTypes['ProgressError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProgressMetadataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ProgressMetadata'] = ResolversParentTypes['ProgressMetadata']> = ResolversObject<{
  customFields?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  deviceInfo?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  lastCheckpoint?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timePerModule?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProgressPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ProgressPayload'] = ResolversParentTypes['ProgressPayload']> = ResolversObject<{
  errors?: Resolver<Maybe<Array<ResolversTypes['ProgressError']>>, ParentType, ContextType>;
  progress?: Resolver<Maybe<ResolversTypes['Progress']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  contentValidation?: Resolver<ResolversTypes['ContentValidationPayload'], ParentType, ContextType, RequireFields<QueryContentValidationArgs, 'id'>>;
  course?: Resolver<ResolversTypes['CoursePayload'], ParentType, ContextType, RequireFields<QueryCourseArgs, 'id'>>;
  courseAnalytics?: Resolver<ResolversTypes['CourseAnalytics'], ParentType, ContextType, RequireFields<QueryCourseAnalyticsArgs, 'courseId'>>;
  enrollmentProgress?: Resolver<ResolversTypes['ProgressPayload'], ParentType, ContextType, RequireFields<QueryEnrollmentProgressArgs, 'enrollmentId'>>;
  getSubscribers?: Resolver<Array<ResolversTypes['Subscriber']>, ParentType, ContextType, Partial<QueryGetSubscribersArgs>>;
  placeholder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  searchCourses?: Resolver<ResolversTypes['CourseConnection'], ParentType, ContextType, Partial<QuerySearchCoursesArgs>>;
  uptime?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  userEnrollments?: Resolver<ResolversTypes['EnrollmentConnection'], ParentType, ContextType, RequireFields<QueryUserEnrollmentsArgs, 'userId'>>;
  validateCertificate?: Resolver<ResolversTypes['CertificateValidationPayload'], ParentType, ContextType, RequireFields<QueryValidateCertificateArgs, 'id'>>;
}>;

export type QuestionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  correctAnswer?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  explanation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  options?: Resolver<Maybe<Array<ResolversTypes['QuestionOption']>>, ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['QuestionType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QuestionOptionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['QuestionOption'] = ResolversParentTypes['QuestionOption']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isCorrect?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RatingRangeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['RatingRange'] = ResolversParentTypes['RatingRange']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  courses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType>;
  max?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  min?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RevenueMetricsResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['RevenueMetrics'] = ResolversParentTypes['RevenueMetrics']> = ResolversObject<{
  averageRevenuePerStudent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lifetimeValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  refundRate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  revenueByPeriod?: Resolver<Array<ResolversTypes['RevenuePeriod']>, ParentType, ContextType>;
  totalRevenue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RevenuePeriodResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['RevenuePeriod'] = ResolversParentTypes['RevenuePeriod']> = ResolversObject<{
  averageRevenuePerEnrollment?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  enrollments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  period?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  revenue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReviewResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  course?: Resolver<ResolversTypes['Course'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  helpful?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reported?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface RichTextScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RichText'], any> {
  name: 'RichText';
}

export type RubricResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Rubric'] = ResolversParentTypes['Rubric']> = ResolversObject<{
  criteria?: Resolver<Array<ResolversTypes['RubricCriterion']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maxScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  passingScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RubricCriterionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['RubricCriterion'] = ResolversParentTypes['RubricCriterion']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  levels?: Resolver<Array<ResolversTypes['RubricLevel']>, ParentType, ContextType>;
  maxPoints?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RubricLevelResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['RubricLevel'] = ResolversParentTypes['RubricLevel']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RubricScoreResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['RubricScore'] = ResolversParentTypes['RubricScore']> = ResolversObject<{
  criterionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  feedback?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchableResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Searchable'] = ResolversParentTypes['Searchable']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Course' | 'Lesson' | 'Module', ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  searchMetadata?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type SkillResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Skill'] = ResolversParentTypes['Skill']> = ResolversObject<{
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['DifficultyLevel'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  prerequisites?: Resolver<Maybe<Array<ResolversTypes['Skill']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StatusCountResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['StatusCount'] = ResolversParentTypes['StatusCount']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  percentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ContentStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriberResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Subscriber'] = ResolversParentTypes['Subscriber']> = ResolversObject<{
  details?: Resolver<ResolversTypes['SubscriberDetails'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriberDetailsResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SubscriberDetails'] = ResolversParentTypes['SubscriberDetails']> = ResolversObject<{
  birthDay?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  assessmentSubmitted?: SubscriptionResolver<ResolversTypes['AssessmentResult'], "assessmentSubmitted", ParentType, ContextType, RequireFields<SubscriptionAssessmentSubmittedArgs, 'courseId'>>;
  certificateStatusUpdated?: SubscriptionResolver<ResolversTypes['Certificate'], "certificateStatusUpdated", ParentType, ContextType, RequireFields<SubscriptionCertificateStatusUpdatedArgs, 'certificateId'>>;
  courseUpdated?: SubscriptionResolver<ResolversTypes['CourseUpdate'], "courseUpdated", ParentType, ContextType, RequireFields<SubscriptionCourseUpdatedArgs, 'courseId'>>;
  enrollmentProgressUpdated?: SubscriptionResolver<ResolversTypes['EnrollmentProgress'], "enrollmentProgressUpdated", ParentType, ContextType, RequireFields<SubscriptionEnrollmentProgressUpdatedArgs, 'enrollmentId'>>;
  progressUpdated?: SubscriptionResolver<ResolversTypes['Progress'], "progressUpdated", ParentType, ContextType, RequireFields<SubscriptionProgressUpdatedArgs, 'enrollmentId'>>;
}>;

export type TimeSeriesDataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['TimeSeriesData'] = ResolversParentTypes['TimeSeriesData']> = ResolversObject<{
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  trend?: Resolver<ResolversTypes['TrendDirection'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrackableResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Trackable'] = ResolversParentTypes['Trackable']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Enrollment', ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastAccessedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  progress?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  startedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
}>;

export type TrendsDataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['TrendsData'] = ResolversParentTypes['TrendsData']> = ResolversObject<{
  completionTrend?: Resolver<Array<ResolversTypes['TimeSeriesData']>, ParentType, ContextType>;
  engagementTrend?: Resolver<Array<ResolversTypes['TimeSeriesData']>, ParentType, ContextType>;
  enrollmentTrend?: Resolver<Array<ResolversTypes['TimeSeriesData']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  achievements?: Resolver<Array<ResolversTypes['Achievement']>, ParentType, ContextType>;
  auditLog?: Resolver<Array<ResolversTypes['AuditEntry']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  enrollments?: Resolver<Array<ResolversTypes['Enrollment']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preferences?: Resolver<ResolversTypes['UserPreferences'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  skills?: Resolver<Array<ResolversTypes['UserSkill']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserPreferencesResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserPreferences'] = ResolversParentTypes['UserPreferences']> = ResolversObject<{
  emailNotifications?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pushNotifications?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  themePreference?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timezone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserSkillResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserSkill'] = ResolversParentTypes['UserSkill']> = ResolversObject<{
  endorsements?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['DifficultyLevel'], ParentType, ContextType>;
  skill?: Resolver<ResolversTypes['Skill'], ParentType, ContextType>;
  verifiedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ValidationConfigResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ValidationConfig'] = ResolversParentTypes['ValidationConfig']> = ResolversObject<{
  customValidation?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  rules?: Resolver<Array<ResolversTypes['ValidationRule']>, ParentType, ContextType>;
  severity?: Resolver<ResolversTypes['WarningSeverity'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ValidationErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ValidationError'] = ResolversParentTypes['ValidationError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  severity?: Resolver<ResolversTypes['WarningSeverity'], ParentType, ContextType>;
  validationType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ValidationRuleResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ValidationRule'] = ResolversParentTypes['ValidationRule']> = ResolversObject<{
  condition?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  severity?: Resolver<ResolversTypes['WarningSeverity'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ValidationRuleConfigResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ValidationRuleConfig'] = ResolversParentTypes['ValidationRuleConfig']> = ResolversObject<{
  customValidation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  parameters?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  severity?: Resolver<ResolversTypes['WarningSeverity'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  AccessControlled?: AccessControlledResolvers<ContextType>;
  AccessibilityInfo?: AccessibilityInfoResolvers<ContextType>;
  Achievement?: AchievementResolvers<ContextType>;
  Assessment?: AssessmentResolvers<ContextType>;
  AssessmentError?: AssessmentErrorResolvers<ContextType>;
  AssessmentMetadata?: AssessmentMetadataResolvers<ContextType>;
  AssessmentPayload?: AssessmentPayloadResolvers<ContextType>;
  AssessmentResult?: AssessmentResultResolvers<ContextType>;
  AssessmentResultPayload?: AssessmentResultPayloadResolvers<ContextType>;
  AssessmentStats?: AssessmentStatsResolvers<ContextType>;
  AuditChange?: AuditChangeResolvers<ContextType>;
  AuditEntry?: AuditEntryResolvers<ContextType>;
  Auditable?: AuditableResolvers<ContextType>;
  Certificate?: CertificateResolvers<ContextType>;
  CertificateError?: CertificateErrorResolvers<ContextType>;
  CertificateMetadata?: CertificateMetadataResolvers<ContextType>;
  CertificatePayload?: CertificatePayloadResolvers<ContextType>;
  CertificateValidationPayload?: CertificateValidationPayloadResolvers<ContextType>;
  CompletionRate?: CompletionRateResolvers<ContextType>;
  CompletionRateRange?: CompletionRateRangeResolvers<ContextType>;
  Content?: ContentResolvers<ContextType>;
  ContentError?: ContentErrorResolvers<ContextType>;
  ContentMetadata?: ContentMetadataResolvers<ContextType>;
  ContentPayload?: ContentPayloadResolvers<ContextType>;
  ContentProcessingResult?: ContentProcessingResultResolvers<ContextType>;
  ContentValidation?: ContentValidationResolvers<ContextType>;
  ContentValidationError?: ContentValidationErrorResolvers<ContextType>;
  ContentValidationPayload?: ContentValidationPayloadResolvers<ContextType>;
  ContentValidationWarning?: ContentValidationWarningResolvers<ContextType>;
  Course?: CourseResolvers<ContextType>;
  CourseAggregations?: CourseAggregationsResolvers<ContextType>;
  CourseAnalytics?: CourseAnalyticsResolvers<ContextType>;
  CourseConnection?: CourseConnectionResolvers<ContextType>;
  CourseEdge?: CourseEdgeResolvers<ContextType>;
  CourseError?: CourseErrorResolvers<ContextType>;
  CourseMetadata?: CourseMetadataResolvers<ContextType>;
  CoursePayload?: CoursePayloadResolvers<ContextType>;
  CourseUpdate?: CourseUpdateResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DifficultyCount?: DifficultyCountResolvers<ContextType>;
  EmailAddress?: GraphQLScalarType;
  EngagementMetrics?: EngagementMetricsResolvers<ContextType>;
  Enrollment?: EnrollmentResolvers<ContextType>;
  EnrollmentConnection?: EnrollmentConnectionResolvers<ContextType>;
  EnrollmentEdge?: EnrollmentEdgeResolvers<ContextType>;
  EnrollmentError?: EnrollmentErrorResolvers<ContextType>;
  EnrollmentMetadata?: EnrollmentMetadataResolvers<ContextType>;
  EnrollmentPayload?: EnrollmentPayloadResolvers<ContextType>;
  EnrollmentProgress?: EnrollmentProgressResolvers<ContextType>;
  EnrollmentRange?: EnrollmentRangeResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  GenerationConfig?: GenerationConfigResolvers<ContextType>;
  Instructor?: InstructorResolvers<ContextType>;
  JSONObject?: GraphQLScalarType;
  LearningPath?: LearningPathResolvers<ContextType>;
  LearningPathError?: LearningPathErrorResolvers<ContextType>;
  LearningPathPayload?: LearningPathPayloadResolvers<ContextType>;
  Lesson?: LessonResolvers<ContextType>;
  LessonConnection?: LessonConnectionResolvers<ContextType>;
  LessonEdge?: LessonEdgeResolvers<ContextType>;
  LessonError?: LessonErrorResolvers<ContextType>;
  LessonMetadata?: LessonMetadataResolvers<ContextType>;
  LessonPayload?: LessonPayloadResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Metadata?: MetadataResolvers<ContextType>;
  Module?: ModuleResolvers<ContextType>;
  ModuleConnection?: ModuleConnectionResolvers<ContextType>;
  ModuleEdge?: ModuleEdgeResolvers<ContextType>;
  ModuleError?: ModuleErrorResolvers<ContextType>;
  ModuleMetadata?: ModuleMetadataResolvers<ContextType>;
  ModulePayload?: ModulePayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  OperationError?: OperationErrorResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  ProcessingError?: ProcessingErrorResolvers<ContextType>;
  Progress?: ProgressResolvers<ContextType>;
  ProgressError?: ProgressErrorResolvers<ContextType>;
  ProgressMetadata?: ProgressMetadataResolvers<ContextType>;
  ProgressPayload?: ProgressPayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  QuestionOption?: QuestionOptionResolvers<ContextType>;
  RatingRange?: RatingRangeResolvers<ContextType>;
  RevenueMetrics?: RevenueMetricsResolvers<ContextType>;
  RevenuePeriod?: RevenuePeriodResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  RichText?: GraphQLScalarType;
  Rubric?: RubricResolvers<ContextType>;
  RubricCriterion?: RubricCriterionResolvers<ContextType>;
  RubricLevel?: RubricLevelResolvers<ContextType>;
  RubricScore?: RubricScoreResolvers<ContextType>;
  Searchable?: SearchableResolvers<ContextType>;
  Skill?: SkillResolvers<ContextType>;
  StatusCount?: StatusCountResolvers<ContextType>;
  Subscriber?: SubscriberResolvers<ContextType>;
  SubscriberDetails?: SubscriberDetailsResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TimeSeriesData?: TimeSeriesDataResolvers<ContextType>;
  Trackable?: TrackableResolvers<ContextType>;
  TrendsData?: TrendsDataResolvers<ContextType>;
  URL?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserPreferences?: UserPreferencesResolvers<ContextType>;
  UserSkill?: UserSkillResolvers<ContextType>;
  ValidationConfig?: ValidationConfigResolvers<ContextType>;
  ValidationError?: ValidationErrorResolvers<ContextType>;
  ValidationRule?: ValidationRuleResolvers<ContextType>;
  ValidationRuleConfig?: ValidationRuleConfigResolvers<ContextType>;
}>;

