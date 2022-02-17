import { render, screen } from '@testing-library/react';
import responseAPI from './mocks';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({
      json: async () => (responseAPI)
    }))

    render(<App />);
  });
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const title = await screen.findByRole('heading', { name: /rick sanchez/i });
    expect(title).toBeDefined();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const button = screen.getByRole('button');
    const input = screen.getByRole('textbox');

    expect(button).toBeDefined();
    expect(input).toBeDefined();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const button = screen.getByRole('button');
    const input = screen.getByRole('textbox');

    userEvent.type(input, 'smith');
    userEvent.click(button);

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(4);
  })

})
