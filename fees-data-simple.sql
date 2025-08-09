-- Simplified fees data - run this AFTER auth-setup.sql
-- All fees except total_fee are set to 0 as requested
DELETE FROM public.fees;

INSERT INTO public.fees (grade, board, monthly_fee, admission_fee, security_deposit, exam_fee, lab_fee, library_fee, sports_fee, misc_fee, total_fee)
VALUES 
  -- State Board Fees (only total_fee has values)
  ('Nursery', 'State', 0, 0, 0, 0, 0, 0, 0, 0, 950),
  ('LKG', 'State', 0, 0, 0, 0, 0, 0, 0, 0, 1000),
  ('UKG', 'State', 0, 0, 0, 0, 0, 0, 0, 0, 1050),
  ('Class 1', 'State', 0, 0, 0, 0, 0, 0, 0, 0, 1200),
  ('Class 2', 'State', 0, 0, 0, 0, 0, 0, 0, 0, 1300),
  ('Class 3', 'State', 0, 0, 0, 0, 0, 0, 0, 0, 1400),
  ('Class 4', 'State', 0, 0, 0, 0, 0, 0, 0, 0, 1500),
  ('Class 5', 'State', 0, 0, 0, 0, 0, 0, 0, 0, 1750),
  ('Class 6', 'State', 0, 0, 0, 0, 0, 0, 0, 0, 1950),
  ('Class 7', 'State', 0, 0, 0, 0, 0, 0, 0, 0, 2150),
  ('Class 8', 'State', 0, 0, 0, 0, 0, 0, 0, 0, 2350),
  ('Class 9', 'State', 0, 0, 0, 0, 0, 0, 0, 0, 2550),
  ('Class 10', 'State', 0, 0, 0, 0, 0, 0, 0, 0, 2900),
  ('Class 11', 'State', 0, 0, 0, 0, 0, 0, 0, 0, 3200),
  ('Class 12', 'State', 0, 0, 0, 0, 0, 0, 0, 0, 3400),

  -- CBSE Board Fees (only total_fee has values)
  ('Nursery', 'CBSE', 0, 0, 0, 0, 0, 0, 0, 0, 1400),
  ('LKG', 'CBSE', 0, 0, 0, 0, 0, 0, 0, 0, 1450),
  ('UKG', 'CBSE', 0, 0, 0, 0, 0, 0, 0, 0, 1500),
  ('Class 1', 'CBSE', 0, 0, 0, 0, 0, 0, 0, 0, 1750),
  ('Class 2', 'CBSE', 0, 0, 0, 0, 0, 0, 0, 0, 1850),
  ('Class 3', 'CBSE', 0, 0, 0, 0, 0, 0, 0, 0, 1950),
  ('Class 4', 'CBSE', 0, 0, 0, 0, 0, 0, 0, 0, 2050),
  ('Class 5', 'CBSE', 0, 0, 0, 0, 0, 0, 0, 0, 2350),
  ('Class 6', 'CBSE', 0, 0, 0, 0, 0, 0, 0, 0, 2550),
  ('Class 7', 'CBSE', 0, 0, 0, 0, 0, 0, 0, 0, 2750),
  ('Class 8', 'CBSE', 0, 0, 0, 0, 0, 0, 0, 0, 2950),
  ('Class 9', 'CBSE', 0, 0, 0, 0, 0, 0, 0, 0, 3150),
  ('Class 10', 'CBSE', 0, 0, 0, 0, 0, 0, 0, 0, 4100),
  ('Class 11', 'CBSE', 0, 0, 0, 0, 0, 0, 0, 0, 4400),
  ('Class 12', 'CBSE', 0, 0, 0, 0, 0, 0, 0, 0, 4600),

  -- ICSE Board Fees (only total_fee has values)
  ('Nursery', 'ICSE', 0, 0, 0, 0, 0, 0, 0, 0, 1750),
  ('LKG', 'ICSE', 0, 0, 0, 0, 0, 0, 0, 0, 1800),
  ('UKG', 'ICSE', 0, 0, 0, 0, 0, 0, 0, 0, 1850),
  ('Class 1', 'ICSE', 0, 0, 0, 0, 0, 0, 0, 0, 2100),
  ('Class 2', 'ICSE', 0, 0, 0, 0, 0, 0, 0, 0, 2200),
  ('Class 3', 'ICSE', 0, 0, 0, 0, 0, 0, 0, 0, 2300),
  ('Class 4', 'ICSE', 0, 0, 0, 0, 0, 0, 0, 0, 2400),
  ('Class 5', 'ICSE', 0, 0, 0, 0, 0, 0, 0, 0, 2900),
  ('Class 6', 'ICSE', 0, 0, 0, 0, 0, 0, 0, 0, 3100),
  ('Class 7', 'ICSE', 0, 0, 0, 0, 0, 0, 0, 0, 3300),
  ('Class 8', 'ICSE', 0, 0, 0, 0, 0, 0, 0, 0, 3500),
  ('Class 9', 'ICSE', 0, 0, 0, 0, 0, 0, 0, 0, 3700),
  ('Class 10', 'ICSE', 0, 0, 0, 0, 0, 0, 0, 0, 4700),
  ('Class 11', 'ICSE', 0, 0, 0, 0, 0, 0, 0, 0, 5000),
  ('Class 12', 'ICSE', 0, 0, 0, 0, 0, 0, 0, 0, 5200);
