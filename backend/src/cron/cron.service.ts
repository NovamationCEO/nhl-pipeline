import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CronService {
  async fetchDataFromApi() {
    const response = await axios.get(
      'https://statsapi.web.nhl.com/api/v1/schedule',
    );
    return response.data;
    // Process the data and store it in your database
  }
}
