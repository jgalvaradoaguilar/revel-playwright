Feature: Filters Our Cars

    Background:
        Given the user go to cars page on Revel URL

    Scenario Outline: Verify response of the filter "<filter>" option "<option>"
        When the user clicks on filter "<filter>"
        And the user choose the option "<option>"
        Then the filter option "<filterOptionInURL>" appears in the URL
        And the first car in the results page is "<firstCarModel>" "<firstCarVersion>"

        Examples:
            | filter    | option          | filterOptionInURL          | firstCarModel | firstCarVersion |
            | Fuel      | Electric Hybrid | ?fuelTypes=electric-hybrid | Toyota C-HR   | 220PH Advance   |
            | Body Type | SUV             | ?bodyType=suv              | Kia XCeed     | 1.0 T-GDi Drive |

    Scenario Outline: Verify response of the filters "<filter_1>" option "<option_1>" and "<filter_2>" option "<option_2>"
        When the user clicks on filter "<filter_1>"
        And the user choose the option "<option_1>"
        And the user clicks on filter "<filter_2>"
        And the user choose the option "<option_2>"
        Then the filter option "<filtersOptionInURL>" appears in the URL
        And the first car in the results page is "<firstCarModel>" "<firstCarVersion>"

        Examples:
            | filter_1 | option_1        | filter_2  | option_2 | filtersOptionInURL                      | firstCarModel | firstCarVersion |
            | Fuel     | Electric Hybrid | Body Type | SUV      | ?fuelTypes=electric-hybrid&bodyType=suv | Toyota C-HR   | 220PH Advance   |
