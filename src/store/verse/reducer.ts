import { GET_JRSC_API } from './constants';
import { JrscPayloadType } from '@/interface/reducer';

interface ActionType {
  type: string;
  payload: JrscPayloadType;
}

const initState: JrscPayloadType = {
  content: '',
  author: '',
  ipAddress: '',
  date: '',
  dynasty: '',
  data: '',
};

// eslint-disable-next-line default-param-last
const verseReducer = (state: JrscPayloadType = initState, { type, payload }: ActionType) => {
  switch (type) {
    case GET_JRSC_API:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default verseReducer;
