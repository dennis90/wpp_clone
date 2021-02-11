import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import SelectField from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import ActionModalHeader from 'components/Conversation/ActionModal/Header';
import { actions as actionPanelActions } from 'store/actionPanel';
import { actions as conversationsActions } from 'store/conversations';
import { BuyerRegistration as FormFields, Citizenship, CivilStatus, Gender } from 'types/Forms';
import { StyledButton, StyledFieldsRow, StyledForm } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'store';
import { MessageTypes } from 'types/Conversation';

const BuyerRegistration: React.FC = () => {
  const dispatch = useDispatch();
  const appUser = useSelector((store: StoreState) => store.session.user);
  const selectedConversationId = useSelector((store: StoreState) => store.conversations.selectedConversationId);
  const { register, control, handleSubmit, errors, setValue, getValues } = useForm<FormFields>();

  const dateChangeHandler: KeyboardDatePickerProps['onChange'] = (value) => {
    setValue('birth_date', value?.getDate());
  };

  const onSubmit = (data: FormFields): void => {
    console.log(data);

    dispatch(
      conversationsActions.sendMessage({
        actions: [],
        type: MessageTypes.GreetingFromBuyer,
        userId: appUser?.id || '',
        when: new Date().toISOString(),
        read: true,
        form: data,
      }),
    );

    dispatch(actionPanelActions.setPanelInfo(undefined));
  };

  return (
    <>
      <ActionModalHeader>Registrar usuário</ActionModalHeader>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" value={selectedConversationId} name="chat_id" ref={register} />

        <input type="hidden" value="fazer_meu_cadastro" name="form" ref={register} />

        <StyledFieldsRow>
          <FormControl>
            <InputLabel id="citizenship-label" error={!!errors.citizenship}>
              Nacionalidade
            </InputLabel>

            <Controller
              control={control}
              name="citizenship"
              id="citizenship"
              defaultValue=""
              rules={{ required: 'Campo obrigatório' }}
              as={
                <SelectField
                  labelId="citizenship-label"
                  id="citizenship"
                  label="Nacionalidade"
                  name="citizenship"
                  error={!!errors.citizenship}
                  defaultValue=""
                >
                  <MenuItem value="">
                    <em>Nenhuma</em>
                  </MenuItem>
                  <MenuItem value={Citizenship.Brazilian}>Brasileira</MenuItem>
                  <MenuItem value={Citizenship.Other}>Outra</MenuItem>
                </SelectField>
              }
            />

            {!!errors.citizenship && <FormHelperText error={true}>{errors.citizenship.message}</FormHelperText>}
          </FormControl>
        </StyledFieldsRow>

        <StyledFieldsRow>
          <TextField
            label="Nome completo"
            name="fullname"
            id="fullname"
            inputProps={{
              ref: register({ required: 'Campo obrigatório' }),
            }}
            error={!!errors.fullname}
            helperText={errors.fullname && errors.fullname.message}
          />
        </StyledFieldsRow>

        <StyledFieldsRow>
          <KeyboardDatePicker
            format="MM/dd/yyyy"
            label="Data de Nascimento"
            variant="inline"
            inputVariant="outlined"
            id="birth_date"
            onChange={dateChangeHandler}
            value={getValues('birth_date')}
            name="birth_date"
            inputProps={{
              ref: register({ required: 'Campo obrigatório' }),
            }}
            error={!!errors.birth_date}
            helperText={errors.birth_date && errors.birth_date.message}
          />

          <FormControl>
            <InputLabel error={!!errors.gender} id="gender_label">
              Gênero
            </InputLabel>
            <Controller
              control={control}
              name="gender"
              defaultValue=""
              rules={{ required: 'Campo obrigatório' }}
              as={
                <SelectField
                  id="gender"
                  labelId="gender_label"
                  name="gender"
                  label="Gênero"
                  error={!!errors.gender}
                  defaultValue=""
                >
                  <MenuItem value="">
                    <em>Nenhum</em>
                  </MenuItem>
                  <MenuItem value={Gender.Male}>Masculino</MenuItem>
                  <MenuItem value={Gender.Female}>Feminino</MenuItem>
                  <MenuItem value={Gender.Other}>Outro</MenuItem>
                </SelectField>
              }
            />

            {!!errors.gender && <FormHelperText error={true}>{errors.gender.message}</FormHelperText>}
          </FormControl>

          <FormControl>
            <InputLabel error={!!errors.civil_status} id="civil_status_label">
              Estado civil
            </InputLabel>
            <Controller
              control={control}
              name="civil_status"
              defaultValue=""
              rules={{ required: 'Campo obrigatório' }}
              as={
                <SelectField
                  id="civil_status"
                  labelId="civil_status_label"
                  name="civil_status"
                  label="Estado civil"
                  error={!!errors.civil_status}
                  defaultValue=""
                >
                  <MenuItem value="">
                    <em>Nenhum</em>
                  </MenuItem>
                  <MenuItem value={CivilStatus.Single}>Solteiro</MenuItem>
                  <MenuItem value={CivilStatus.Married}>Casado</MenuItem>
                  <MenuItem value={CivilStatus.Divorced}>Divorciado</MenuItem>
                  <MenuItem value={CivilStatus.Separated}>Separado</MenuItem>
                  <MenuItem value={CivilStatus.Widowed}>Viúvo</MenuItem>
                </SelectField>
              }
            />

            {!!errors.civil_status && <FormHelperText error={true}>{errors.civil_status.message}</FormHelperText>}
          </FormControl>
        </StyledFieldsRow>

        <StyledFieldsRow>
          <TextField
            label="Nome da mãe"
            name="mother_fullname"
            id="mother_fullname"
            inputProps={{
              ref: register({ required: 'Campo obrigatório' }),
            }}
            error={!!errors.mother_fullname}
            helperText={errors.mother_fullname && errors.mother_fullname.message}
          />
        </StyledFieldsRow>

        <StyledFieldsRow>
          <TextField
            label="Nome do pai"
            name="father_fullname"
            id="father_fullname"
            inputProps={{
              ref: register,
            }}
          />
        </StyledFieldsRow>

        <StyledFieldsRow>
          <TextField
            name="birth_country"
            id="birth_country"
            label="Local de nascimento"
            error={!!errors.birth_country}
            helperText={errors.birth_country && errors.birth_country.message}
            inputProps={{
              ref: register({ required: 'Campo obrigatório' }),
            }}
          />

          <TextField
            name="birth_state"
            id="birth_state"
            label="Estado"
            error={!!errors.birth_state}
            helperText={errors.birth_state && errors.birth_state.message}
            inputProps={{
              ref: register({ required: 'Campo obrigatório' }),
            }}
          />

          <TextField
            name="birth_city"
            id="birth_city"
            label="Cidade"
            error={!!errors.birth_city}
            helperText={errors.birth_city && errors.birth_city.message}
            inputProps={{
              ref: register({ required: 'Campo obrigatório' }),
            }}
          />
        </StyledFieldsRow>

        <StyledButton type="submit">
          <SaveIcon fontSize="large" />
          Salvar
        </StyledButton>
      </StyledForm>
    </>
  );
};

export default BuyerRegistration;
