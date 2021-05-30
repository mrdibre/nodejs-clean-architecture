import { Collection } from "mongodb";
import { MongoHelper } from "../helpers/mongo-helper";
import { SurveyMongoRepository } from "./survey-repository";

let surveyCollection: Collection;

const makeFakeSurvey = () => ({
  question: "any_question",
  answers: [
    {
      image: "any_image",
      answer: "any_answer",
    },
    {
      answer: "other_answer",
    },
  ],
});

const makeSut = () => {
  const sut = new SurveyMongoRepository();

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
  });

  test("Should add a survey on success", async () => {
    const { sut } = makeSut();

    const surveyData = makeFakeSurvey();

    await sut.add(surveyData);

    const survey = await surveyCollection.findOne({
      question: surveyData.question,
    });

    expect(survey).toBeTruthy();
    expect(survey.answers).toHaveLength(2);
  });
});
