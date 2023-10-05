import { render, screen, waitFor } from "@testing-library/react";
import { LoginPage } from './Login';
import userEvent from "@testing-library/user-event";

const onSubmit = jest.fn()

beforeEach(()=>{
  const {  } = render(<LoginPage />)
  onSubmit.mockClear()
})

  test('redirect to call list page after successful login', async() => {
      const login = render(<LoginPage/>);
      //cy.login('cedric@aircall.io', 'password');
      const eMail = screen.getByTestId('email')
    const password = screen.getByTestId('password')
    userEvent.type(eMail, "abcd@gmail.ci")
    userEvent.type(password, "1234")
  
    userEvent.click(screen.getByTestId('submit'))
  
    await waitFor(()=>{
      expect(onSubmit).toHaveBeenCalledTimes(1)
    });
  })

export {};