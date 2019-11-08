import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Header,
  Icon,
  Form,
  TextArea,
  Input,
  Button,
  Image,
  Message
} from 'semantic-ui-react';

import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

const INITIAL_STATE = {
  name: '',
  price: '',
  media: '',
  description: ''
};

const create = () => {
  const [inputs, setInputs] = useState(INITIAL_STATE);
  const [mediaPreview, setMediaPreview] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const isProduct = Object.values(inputs).every((input) => Boolean(input));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [inputs]);

  const handleChange = (evt) => {
    const { name, value, files } = evt.target;
    if (name === 'media') {
      setInputs((prevState) => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setInputs((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('file', inputs.media);
    data.append('upload_preset', 'royal-merchandise');
    data.append('cloud_name', 'ashfaqshimer');
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url;
    return mediaUrl;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      setError('');
      setLoading(true);
      const mediaUrl = await handleImageUpload();
      const url = `${baseUrl}/api/product`;
      const { name, price, description } = inputs;
      const payload = { name, price, description, mediaUrl };
      const response = await axios.post(url, payload);

      setInputs(DEFAULT_STATE);
      setSuccess(true);
    } catch (err) {
      console.error('ERROR!', err);
      catchErrors(err, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header as='h2'>
        <Icon name='add' color='orange' />
        Create New Product
      </Header>
      <Form
        loading={loading}
        error={Boolean(error)}
        success={success}
        onSubmit={handleSubmit}
      >
        <Message
          success
          icon='check'
          header='Success!'
          content='Your product has been successfully posted.'
        />
        <Message error header='Oops!' content={error} />
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            name='name'
            label='Name'
            placeholder='Name'
            value={inputs.name}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name='price'
            type='number'
            label='Price'
            placeholder='price'
            min='0.00'
            step='0.01'
            value={inputs.price}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name='media'
            type='file'
            label='Media'
            accept='image/*'
            content='Select Image'
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size='small' />
        <Form.Field
          control={TextArea}
          name='description'
          label='Description'
          placeholder='Description'
          value={inputs.description}
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          color='blue'
          icon='pencil alternate'
          content='Submit'
          type='submit'
          disabled={disabled || loading}
        />
      </Form>
    </>
  );
};

export default create;
