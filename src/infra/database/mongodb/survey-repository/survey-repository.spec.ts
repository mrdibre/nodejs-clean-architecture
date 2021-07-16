import { Collection } from "mongodb";
import { MongoHelper } from "../helpers/mongo-helper";
import { SurveyMongoRepository } from "./survey-repository";
import { mockSurveyModel, mockSurveyModels } from "@/domain/test";

let surveyCollection: Collection;

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

  describe("add()", () => {
    test("Should add a survey on success", async () => {
      const { sut } = makeSut();

      const surveyData = mockSurveyModel();

      await sut.add(surveyData);

      const survey = await surveyCollection.findOne({
        question: surveyData.question,
      });

      expect(survey).toBeTruthy();
      expect(survey.answers).toHaveLength(2);
    });
  });

  describe("loadAll()", () => {
    test("Should load all surveys on success", async () => {
      const { sut } = makeSut();

      await surveyCollection.insertMany(mockSurveyModels());

      const surveys = await sut.loadAll();

      expect(surveys.length).toBe(2);
      expect(surveys[0].question).toBe("any_question");
      expect(surveys[1].question).toBe("other_question");
    });

    test("Should load empty list", async () => {
      const { sut } = makeSut();

      const surveys = await sut.loadAll();

      expect(surveys.length).toBe(0);
    });
  });

  describe("loadById()", () => {
    test("Should load survey by id on success", async () => {
      const { sut } = makeSut();

      const { ops } = await surveyCollection.insertOne(mockSurveyModel());

      const id = ops[0]._id;

      const survey = await sut.loadById(id);

      expect(survey).toBeTruthy();
    });
  });
});
