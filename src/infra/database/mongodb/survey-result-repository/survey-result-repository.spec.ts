import { Collection } from "mongodb";
import { MongoHelper } from "../helpers/mongo-helper";
import { SurveyResultMongoRepository } from "./survey-result-repository";
import { SurveyModel } from "@/domain/models/survey";
import { AccountModel } from "@/domain/models/account";
import { mockSurveyModel } from "@/domain/test";

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const makeSurvey = async (): Promise<SurveyModel> => {
  const { ops } = await surveyCollection.insertOne(mockSurveyModel());

  return ops[0];
};

const makeAccount = async (): Promise<AccountModel> => {
  const { ops } = await accountCollection.insertOne({
    name: "any_name",
    email: "any_email@gmail.com",
    password: "any_password",
  });

  return ops[0];
};

const makeSurveyResult = (
  accountId: string,
  surveyId: string,
  answer: string,
) => ({
  accountId,
  surveyId,
  answer,
  date: new Date(),
});

const makeSut = () => {
  const sut = new SurveyResultMongoRepository();

  return { sut };
};

describe("Account Mongo Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection("surveys");
    await surveyCollection.deleteMany({});

    surveyResultCollection = await MongoHelper.getCollection("surveyResults");
    await surveyResultCollection.deleteMany({});

    accountCollection = await MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  describe("save()", () => {
    test("Should add a survey result if its new", async () => {
      const { sut } = makeSut();

      const survey = await makeSurvey();
      const account = await makeAccount();

      const surveyResult = await sut.save(
        makeSurveyResult(survey.id, account.id, survey.answers[0].answer),
      );

      expect(surveyResult).toBeTruthy();
      expect(surveyResult.id).toBeTruthy();
      expect(surveyResult.answer).toBe(survey.answers[0].answer);
    });

    test("Should update a survey result if already exists", async () => {
      const { sut } = makeSut();

      const survey = await makeSurvey();
      const account = await makeAccount();

      const data = makeSurveyResult(
        survey.id,
        account.id,
        survey.answers[0].answer,
      );

      const { ops: res } = await surveyResultCollection.insertOne(data);

      const surveyResult = await sut.save({
        ...data,
        answer: survey.answers[1].answer,
      });

      expect(surveyResult).toBeTruthy();
      expect(surveyResult.id).toEqual(res[0]._id);
      expect(surveyResult.answer).toBe(survey.answers[1].answer);
    });
  });
});
