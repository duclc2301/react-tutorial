import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  onSearch: (value: string) => void;
}

const Search = (props: Props) => {
  const { onSearch } = props;
  const [value, setValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(value.trim());
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSearch}
      sx={{ display: 'flex', mb: 1.5 }}
    >
      <TextField
        placeholder="Search for todo..."
        sx={{ flexGrow: 1 }}
        value={value}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Search;
