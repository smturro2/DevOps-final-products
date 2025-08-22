const request = require('supertest');
const express = require('express');
const index = require('../index');

describe('Express App', () => {
    it('should respond with OK on /health', async () => {
        const response = await request(index).get('/health');
        expect(response.status).toBe(200);
        expect(response.text).toBe('OK');
    });
});
