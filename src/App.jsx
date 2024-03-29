import Select from './components/Select/Select';

import './App.scss';

function App() {
  const initialOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
  ];

  const customRenderOptions = (option) => (
    <div>
      <span>{option.label}</span>
      <span>({option.value})</span>
    </div>
  )

  const customRenderSelectedOption = (option) => (
    <div>
      Вы выбрали: <strong>{option.label}</strong>
    </div>
  )

  return (
    <div className="App">
      <h1>Custom Selects</h1>
      <div className="selects">
        <Select options={initialOptions} />
        <Select options={initialOptions}
                renderSelectedOption={customRenderSelectedOption}
        />
        <Select options={initialOptions}
                renderOption={customRenderOptions}
        />
      </div>
    </div>
  );
}

export default App;
