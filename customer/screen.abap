REPORT z_customer_info.

* Define internal table and work area for customer data
DATA: lt_customers TYPE TABLE OF kna1,
      ls_customer  TYPE kna1.

* Selection screen for user input
SELECTION-SCREEN BEGIN OF BLOCK b1 WITH FRAME TITLE TEXT-001.
  SELECT-OPTIONS: s_kunnr FOR ls_customer-kunnr.
SELECTION-SCREEN END OF BLOCK b1.

* Start of executable program
START-OF-SELECTION.

  * Fetch customer data based on selection criteria
  SELECT * FROM kna1 INTO TABLE lt_customers
    WHERE kunnr IN s_kunnr.

  * Check if data was found
  IF sy-subrc = 0.
    * Display customer information
    LOOP AT lt_customers INTO ls_customer.
      WRITE: / 'Customer Number:', ls_customer-kunnr,
             / 'Name:', ls_customer-name1,
             / 'City:', ls_customer-ort01,
             / 'Country:', ls_customer-land1.
      SKIP.
    ENDLOOP.
  ELSE.
    MESSAGE 'No customers found for the given criteria.' TYPE 'I'.
  ENDIF.
