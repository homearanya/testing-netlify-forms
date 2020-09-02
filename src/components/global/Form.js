import React, { useState } from "react"
import moment from "moment"

import { FlexContainer, Container } from "../../utils"

import { FormGroup, Label, Input, TextArea, Button } from "../../utils/FormItem"

import { encode } from "../../utils/helpers"

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "test-form",
        "who-is-receiving-this-email":
          "marketing@tacenergy.com; tperryman@thearnoldcos.com",
        "date-of-submission": moment().format("MMMM Do YYYY, h:mm a"),
        ...formData,
      }),
    })
      .then(() => {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: "popinSubmit",
          "gtm.elementId": "contact-us",
        })
        resetForm()
      })
      .catch(error => alert(error))
  }

  const handleChange = event => {
    event.persist()
    setFormData(formData => ({
      ...formData,
      [event.target.name]: event.target.value,
    }))
  }
  return (
    <Container minWidth={"60%"} minHeight={"100%"}>
      <form
        name="contact"
        // method="POST"
        // action="/success"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contact" />
        <input
          type="hidden"
          name="who-is-receiving-this-email"
          defaultValue="marketing@tacenergy.com; tperryman@thearnoldcos.com"
        />

        <input
          type="hidden"
          name="date-of-submission"
          defaultValue={moment().format("MMMM Do YYYY, h:mm a")}
        />
        <FlexContainer justifyContent={"center"}>
          <FormGroup>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onChange={handleChange}
              value={formData.name}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
            />
          </FormGroup>
        </FlexContainer>
        <FlexContainer justifyContent={"center"}>
          <TextArea
            name="message"
            id="message"
            placeholder="Write a Message"
            onChange={handleChange}
            value={formData.message}
          />
        </FlexContainer>
        <FlexContainer
          justifyContent={"flex-end"}
          alignItem={"center"}
          tabJustify
        >
          <Button type="submit">Send</Button>
        </FlexContainer>
      </form>
    </Container>
  )
}

export default Form
