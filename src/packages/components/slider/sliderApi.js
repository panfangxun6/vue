import {server} from '../../../tools/servers';

export class sliderApi {
  static get() {
    return server.connection('GET', '');
  }
}
