import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

jest.mock('axios', () => {
  return {
    ...(jest.requireActual('axios') as object),
    create: jest.fn().mockReturnValue(jest.requireActual('axios'))
  }
})
const mockAdapter = new MockAdapter(axios);

jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
}));

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

describe('Home', () => {
    const handleSubmitMock = jest.fn();

    beforeAll(() => {
      axios.create({
        baseURL: 'http://localhost:4000'
      });
    });
    
    it('should render Home component', () => {
        render(<Home/>)
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('Should fire form submit alert', async () => {
      render(<Home/>);
      fireEvent.submit(screen.getByRole('button'));
      expect(await screen.findAllByRole("alert")).toHaveLength(2);
    });

    it('Should fire submit without alerts', async() => {
      render(<Home/>);
      fireEvent.input(screen.getByRole("textbox", {name: "Nombre"}), {
        target: {
          value: "PERRO"
        }
      });
      fireEvent.input(screen.getByLabelText("Password"), {
        target: {
          value: "perro.1234"
        }
      })
      fireEvent.submit(screen.getByRole("button"))
      mockAdapter.onGet('/animals').reply(200, [{
        "id": 982,
        "nombre": "PERRO",
        "email": "perro@perro.com",
        "password": "perro.1234"
      }]);
      await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    });
})
