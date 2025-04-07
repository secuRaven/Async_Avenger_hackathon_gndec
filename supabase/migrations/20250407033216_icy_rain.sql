/*
  # Initial Schema for Student Management System

  1. New Tables
    - `profiles`
      - Student profiles with basic information
    - `courses`
      - Available courses
    - `enrollments`
      - Student course enrollments
    - `assignments`
      - Course assignments
    - `assignment_submissions`
      - Student assignment submissions
    - `exams`
      - Exam schedules and details
    - `exam_submissions`
      - Student exam submissions
    - `marks`
      - Student marks/grades
    - `fees`
      - Fee records and payments
    
  2. Security
    - Enable RLS on all tables
    - Add policies for student and faculty access
*/

-- Profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text NOT NULL,
  student_id text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  date_of_birth date,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Courses table
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  credits integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enrollments table
CREATE TABLE enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  semester integer NOT NULL,
  academic_year text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, course_id, semester, academic_year)
);

-- Assignments table
CREATE TABLE assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date timestamptz NOT NULL,
  max_marks integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Assignment submissions table
CREATE TABLE assignment_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid REFERENCES assignments(id) ON DELETE CASCADE,
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  submission_url text NOT NULL,
  marks integer,
  feedback text,
  submitted_at timestamptz DEFAULT now(),
  UNIQUE(assignment_id, student_id)
);

-- Exams table
CREATE TABLE exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  date timestamptz NOT NULL,
  duration integer NOT NULL, -- in minutes
  max_marks integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Exam submissions table
CREATE TABLE exam_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid REFERENCES exams(id) ON DELETE CASCADE,
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  marks integer,
  submitted_at timestamptz DEFAULT now(),
  UNIQUE(exam_id, student_id)
);

-- Marks table
CREATE TABLE marks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  exam_type text NOT NULL,
  marks integer NOT NULL,
  max_marks integer NOT NULL,
  remarks text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, course_id, exam_type)
);

-- Fees table
CREATE TABLE fees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  fee_type text NOT NULL,
  amount decimal NOT NULL,
  due_date date NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  payment_date timestamptz,
  transaction_id text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE fees ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Students can view enrolled courses"
  ON courses FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE enrollments.course_id = courses.id
      AND enrollments.student_id = auth.uid()
    )
  );

CREATE POLICY "Students can view their enrollments"
  ON enrollments FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can view assignments for enrolled courses"
  ON assignments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE enrollments.course_id = assignments.course_id
      AND enrollments.student_id = auth.uid()
    )
  );

CREATE POLICY "Students can view and create their assignment submissions"
  ON assignment_submissions FOR ALL
  TO authenticated
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can view exams for enrolled courses"
  ON exams FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE enrollments.course_id = exams.course_id
      AND enrollments.student_id = auth.uid()
    )
  );

CREATE POLICY "Students can view and create their exam submissions"
  ON exam_submissions FOR ALL
  TO authenticated
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can view their marks"
  ON marks FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can view their fees"
  ON fees FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());