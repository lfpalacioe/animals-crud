import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import NewUser from '@/app/new-user/page';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';


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

describe('New User', () => {

  beforeAll(() => {
    axios.create({
      baseURL: 'http://localhost:4000'
    });
  });
    
  it('should render NewUser component', () => {
    
    render(<NewUser/>)
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('Should render new user with alerts', async() => {
    render(<NewUser/>);
    fireEvent.submit(screen.getByRole('button'));
    expect(await screen.findAllByRole("alert")).toHaveLength(3);
  });

  it('Should fire submit without alerts', async() => {
    render(<NewUser/>);
    fireEvent.input(screen.getByRole("textbox", {name: "Nombre"}), {
      target: {
        value: "GALLINA"
      }
    });
    fireEvent.input(screen.getByLabelText("Password"), {
      target: {
        value: "gallina.1234"
      }
    })
    fireEvent.input(screen.getByLabelText("E-mail"), {
      target: {
        value: "gallina@gallina.com"
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