import * as React from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Stepper, Step, Button, SxProps } from '@mui/material';
import { validationSchema } from '../components/OrderForms/validationShema';
import { TValidationSchema } from '../components/OrderForms/model';
import { CompleteStep, ConfirmationStep, OrderStep, PassengerInfoStep } from '../components/OrderForms/Steps';
import { Form } from '../components/Form';
import { useNavigate } from 'react-router-dom';
import { AltOrderStep, AltPassengerInfoStep } from '../components/OrderForms/AltSteps';

interface OrderPageProps {
}

const button : SxProps = {
  width: '343px',
  height: '40px',
  background: '#007AFF',
  borderRadius: '8px',
  color: 'white',
  fontSize: '15px',
  textTransform: 'none',
  "&:hover" : {
    backgroundColor: '#007AFF',
  }
}

const buttonBack : SxProps = {
  width: '343px',
  height: '40px',
  background: "#F2F2F2",
  border: "1px solid #007AFF",
  borderRadius: "8px",
  fontStyle: "normal",
  fontWeight: '400',
  fontSize: '15px',
  lineHeight: '18px',
  textTransform: 'none',
  marginBottom: '20px',
  
}

const OrderPage: React.FC<OrderPageProps> = () => {
    const steps = [
        {
            label: 'Заказать трансфер',
            description: <AltOrderStep/>
        },
        {
            label: 'Заказать трансфер',
            description: <AltPassengerInfoStep/>
        },
        {
            label: 'Заказать трансфер',
            description: <ConfirmationStep/>
        },
        {
            label: 'Заказать трансфер',
            description: <CompleteStep/>
        }
    ]

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;
  const navigate = useNavigate()

  const methods = useForm<any>();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep !== steps.length - 1 ? prevActiveStep + 1 : prevActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


    return ( 
        <form className="order-page" onSubmit={methods.handleSubmit(d => console.log(d))}>
          <FormProvider {...methods}>
            <h1 className='order-title'>Заказать трансфер</h1>
            <div>
                {steps[activeStep].description}
            </div>
                <Stepper activeStep={activeStep} connector={null}>
                  {steps.map((_, index) => <Step 
                   key={index}/>
                  )}
                </Stepper>
                {activeStep > 0 && activeStep < maxSteps - 1
                ? <div style={{display: 'flex', gap: "15px"}}>
                <Button sx={buttonBack} onClick={handleBack}>Назад</Button>
                <Button sx={button} type='submit' onClick={handleNext}>Далее</Button>
              </div>
                : 
                activeStep == 3 ? <></>: <Button sx={button} type='submit' onClick={handleNext}>Далее</Button>}
          </FormProvider>
        </form>
     );
}
 
export default OrderPage;