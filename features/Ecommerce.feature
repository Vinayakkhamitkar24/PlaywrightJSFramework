Feature: Ecommerce Site validations

Scenario: Place order
    Given User Login to site using "khamitkarv323@gmail.com" and "password"
    When  Add "ADIDAS ORIGINAL " product to cart
    And   check added product showing in cart
    And   Checkout and fill all details and place order
    Then  Verify order placed succesfully
    And   Verify Placed order in order History