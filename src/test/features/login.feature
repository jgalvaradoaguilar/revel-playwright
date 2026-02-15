Feature: Login

    Background:
        Given the user go to login on Revel URL

    Scenario Outline: Login successful with phone pre-set OTP: <email> - <phone> - <otp_code>
        And the user login with his phone "<phone>"
        #And the user skip human verification
        When the user writes the OTP received "<otp>"
        Then the user is logged successfully

        Examples:
            | email                                  | country | phone     | otp  |
            | jorge.diaz+casopractico@driverevel.com | ES      | 879542345 | 8048 |

    Scenario Outline: Login failed because a wrong OTP code: <email> - <phone> - <otp_code> 
        And the user login with his phone "<phone>"
        #And the user skip human verification
        When the user writes the OTP received "<otp>"
        Then an error message is showed

        Examples:
            | email                                  | country | phone     | otp  |
            | jorge.diaz+casopractico@driverevel.com | ES      | 879542345 | 1234 |
