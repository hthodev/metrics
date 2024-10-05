'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const user = [{
        id: '304ed4e5-f9f6-43e2-88b5-3ff7cad3f5f1',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email@mail.com',
        createdAt: new Date('2024-10-05 15:25:01.644000'),
        updatedAt: new Date('2024-10-05 15:25:01.644000'),
      }]
      const metricConversations = [
        // Distance conversions
        { id: 'af8ba75d-3021-49b5-a4ea-c603b6cd83c1', metricType: 'DISTANCE', fromUnit: 'METER', toUnit: 'CENTIMETER', conversationRate: 100.0, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: 'ff0c8aef-0074-4316-aa7e-e4b92963a6ed', metricType: 'DISTANCE', fromUnit: 'METER', toUnit: 'INCH', conversationRate: 39.3701, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: '02a17a61-1cbc-4e3c-9c49-93d0c8ee4f79', metricType: 'DISTANCE', fromUnit: 'METER', toUnit: 'FEET', conversationRate: 3.28084, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: '4ccf65df-b556-4eac-bf68-a4bbd673e917', metricType: 'DISTANCE', fromUnit: 'METER', toUnit: 'YARD', conversationRate: 1.09361, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: 'a17aad68-39be-4e0f-87d6-6001e53a02b1', metricType: 'DISTANCE', fromUnit: 'CENTIMETER', toUnit: 'METER', conversationRate: 0.01, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: '3723dd24-67fd-4fee-8265-6c9de17b9033', metricType: 'DISTANCE', fromUnit: 'CENTIMETER', toUnit: 'INCH', conversationRate: 0.393701, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: '802897b2-8342-4b6b-a19a-03c44eec6f75', metricType: 'DISTANCE', fromUnit: 'CENTIMETER', toUnit: 'FEET', conversationRate: 0.0328084, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: 'abdaa829-9626-4989-b757-32951b822f94', metricType: 'DISTANCE', fromUnit: 'CENTIMETER', toUnit: 'YARD', conversationRate: 0.0109361, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: '83bbab54-5d2c-46d6-9fa0-c3c9e000f50d', metricType: 'DISTANCE', fromUnit: 'INCH', toUnit: 'METER', conversationRate: 0.0254, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: 'c0292364-d1ed-4266-9097-3ca8a8c4d83d', metricType: 'DISTANCE', fromUnit: 'INCH', toUnit: 'CENTIMETER', conversationRate: 2.54, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: 'f772c581-5412-4812-9d9a-0f4727a5a4f6', metricType: 'DISTANCE', fromUnit: 'INCH', toUnit: 'FEET', conversationRate: 12.0, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: '33b2777f-c991-431b-82be-6e5dfe1cba57', metricType: 'DISTANCE', fromUnit: 'INCH', toUnit: 'YARD', conversationRate: 0.0277778, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: '9997e887-48d4-48f9-b9d6-b2a5fcaaf2d2', metricType: 'DISTANCE', fromUnit: 'FEET', toUnit: 'METER', conversationRate: 0.3048, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: 'f4f8c252-dd56-49ee-8f5b-02f87a413690', metricType: 'DISTANCE', fromUnit: 'FEET', toUnit: 'CENTIMETER', conversationRate: 30.48, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: 'fa0742d9-0756-49de-bfe5-e40979d1dcba', metricType: 'DISTANCE', fromUnit: 'FEET', toUnit: 'INCH', conversationRate: 12.0, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: 'a94c47d8-3ecd-4cae-89fc-44dd2ae27232', metricType: 'DISTANCE', fromUnit: 'FEET', toUnit: 'YARD', conversationRate: 3.0, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: '676f8974-5561-45cc-b4a3-38f451a02261', metricType: 'DISTANCE', fromUnit: 'YARD', toUnit: 'METER', conversationRate: 0.9144, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: 'edb50365-9b86-4592-876d-d5282572d56c', metricType: 'DISTANCE', fromUnit: 'YARD', toUnit: 'CENTIMETER', conversationRate: 91.44, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: '4fb9cd12-b2ea-4574-9798-6636ba6f43a8', metricType: 'DISTANCE', fromUnit: 'YARD', toUnit: 'INCH', conversationRate: 36.0, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: '9c85a1f1-f17d-4564-a955-6f2ec3f73ea2', metricType: 'DISTANCE', fromUnit: 'YARD', toUnit: 'FEET', conversationRate: 3.0, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
  
        // Temperature conversions
        { id: '97b722e6-4e20-4ef9-a3b8-2e81574737b7', metricType: 'TEMPERATURE', fromUnit: 'C', toUnit: 'F', conversationRate: 1.8, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: '79bd7381-66cb-41cd-b739-a42cdd88e7e3', metricType: 'TEMPERATURE', fromUnit: 'C', toUnit: 'K', conversationRate: 1.0, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: 'b9504a6f-f911-433c-8dc7-00318f827ab7', metricType: 'TEMPERATURE', fromUnit: 'F', toUnit: 'C', conversationRate: 0.555556, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: '2ae73d99-0506-4c90-9a94-23f535464bdd', metricType: 'TEMPERATURE', fromUnit: 'F', toUnit: 'K', conversationRate: 0.555556, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: '14664ef3-e018-4c3c-9ad1-566c4280e71a', metricType: 'TEMPERATURE', fromUnit: 'K', toUnit: 'C', conversationRate: 1.0, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
        { id: '1436f62c-4504-4763-8b84-7686a9aef5fa', metricType: 'TEMPERATURE', fromUnit: 'K', toUnit: 'F', conversationRate: 1.8, createdAt: new Date('2024-10-05 15:25:01.644Z'), updatedAt: new Date('2024-10-05 15:25:01.644Z') },
      ];

      await queryInterface.bulkInsert(
        'metricConversations',
        metricConversations,
        { transaction },
      );
      await queryInterface.bulkInsert(
        'users',
        user,
        { transaction },
      );
      await transaction.commit();
      console.log('Metric conversations seeded successfully!');
    } catch (error) {
      await transaction.rollback();
      console.error('Error seeding metric conversations:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete('MetricConversations', null, {
        transaction,
      });
      await transaction.commit();
      console.log('Metric conversations deleted successfully!');
    } catch (error) {
      await transaction.rollback();
      console.error('Error deleting metric conversations:', error);
    }
  },
};
