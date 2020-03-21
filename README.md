# e-commerce-cms

admin email: admin@admin.com
admin password :tests

user email: user@user.com 
user password : tests

user email:joni@dangdut.mail.com
user password :tests
https://dascomix.firebaseapp.com/


GET PRODUCT ROUTE
|    ROUTE     |HTTP            | HEADERS  | BODY  | DESCRIPTION  | RESPONSE CODE    |
| ------------- |:-------------:|    -----:| -----:|        -----:|       -----:|
|PRODUCT/       |  GET          |   NONE   | NONE  |GET ALL PRODUCT|    200      |

ADD PRODUCT ROUTE
|    ROUTE     |HTTP            | HEADERS  | BODY  | DESCRIPTION  | RESPONSE CODE    |
| ------------- |:-------------:|    -----:| -----:|        -----:|       -----:|
|PRODUCT/       |  POST          |ADMIN TOKEN   | NAME,STOCKS,PRICE,IMAGE_URL  |INSERT NEW PRODUCT|    200 (SUCCESS)      |
|PRODUCT/       |  POST          |ADMIN TOKEN   | MISSING ONE OR MORE   |MISSING/INVALID BODY|    400 (ERROR)      |
|PRODUCT/       |  POST          |NONE   | NAME,STOCKS,PRICE,IMAGE_UR   |FAIL BECAUSE AUTHETICATION|    403 (ERROR)      |
|PRODUCT/       |  POST          |USER TOKEN   | NAME,STOCKS,PRICE,IMAGE_UR   |FAIL BECAUSE AUTHETICATION|    403 (ERROR)      |

GET PRODUCT BY ID
|    ROUTE     |HTTP            | HEADERS  | BODY  | DESCRIPTION  | RESPONSE CODE    |
| ------------- |:-------------:|    -----:| -----:|        -----:|       -----:|
|PRODUCT/:ID       |  GET          |   TOKEN(ANY)   | NONE |GET PRODUCTS BY ID|    200 (SUCCESS)      |
|PRODUCT/:ID (NOT FOUND)       |  GET          |   TOKEN(ANY)   | NONE |GET PRODUCTS BY ID|    404 (ERROR)      |

GET PRODUCT BY ID
|    ROUTE     |HTTP            | HEADERS  | BODY  | DESCRIPTION  | RESPONSE CODE    |
| ------------- |:-------------:|    -----:| -----:|        -----:|       -----:|
|PRODUCT/:ID       |  PUT          |   TOKEN   | NAME,STOCK,PRICE,IMAGE_URL |UPDATE PRODUCT BY ID|    200 (SUCCESS)      |
|PRODUCT/:ID (NOT FOUND)      |  PUT          |   TOKEN   | NAME,STOCK,PRICE,IMAGE_URL |CANNOT UPDATE BECAUSE DATA IS NOT EXIST|    404 (ERROR)      |
|PRODUCT/:ID     |  PUT          |   TOKEN   | INVALID/ MISSING ONE OR MORE|BAD REQUEST|    400 (ERROR)      |
|PRODUCT/:ID     |  PUT          |   TOKEN(USER)   | FORBIDDEN ACCESS|    403 (ERROR)      |
|PRODUCT/:ID     |  PUT          |   NONE   | FORBIDDEN ACCESS|    403 (ERROR)      |

DELETE PRODUCT BY ID
|    ROUTE     |HTTP            | HEADERS  | BODY  | DESCRIPTION  | RESPONSE CODE    |
| ------------- |:-------------:|    -----:| -----:|        -----:|       -----:|
|PRODUCT/:ID       |  DELETE          |   TOKEN   | NONE |DELETE PRODUCT BY ID|    200 (SUCCESS)      |
|PRODUCT/:ID (NOT FOUND)    |  DELETE          |   TOKEN   | NONE |CANNOT DELETE BECAUSE DATA IS NOT EXIST|    404 (ERROR)      |
|PRODUCT/:ID (NOT FOUND)    |  DELETE          |   NONE   | NONE |INVALID CREDENTIALS|    403 (ERROR)      |
|PRODUCT/:ID (NOT FOUND)    |  DELETE          |   TOKEN (USER)   | NONE |INVALID CREDENTIALS|    403 (ERROR)      |



USER REGISTER
|    ROUTE     |HTTP            | HEADERS  | BODY  | DESCRIPTION  | RESPONSE CODE    |
| ------------- |:-------------:|    -----:| -----:|        -----:|       -----:|
|USER/REGISTER       |  POST          |   NONE   | NAME,EMAIL,PASSWORD,LEVEL |SUCCESFULL REGSITER|    200 (SUCCESS)      |
|USER/REGISTER       |  POST          |   NONE   | MISSING/INVALID ONE OR MORE |FAILED REGSITER|    400 (ERROR)      |
|USER/REGISTER       |  POST          |   NONE   | NAME,EMAIL,PASSWORD,LEVEL|FAILED BECAUSE EMAIL HAS BEEN USED|    400 (ERROR)      |



USER LOGIN
|    ROUTE     |HTTP            | HEADERS  | BODY  | DESCRIPTION  | RESPONSE CODE    |
| ------------- |:-------------:|    -----:| -----:|        -----:|       -----:|
|USER/LOGIN       |  POST          |   NONE   | EMAIL PASSWORD |SUCESSFUL LOGIN|    200 (SUCCESS)      |
|USER/LOGIN       |  POST          |   NONE   | EMAIL PASSWORD |PASSWORD MISMATCH|    401 (ERROR)      |
