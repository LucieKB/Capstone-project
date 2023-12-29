class Educator < User
    has_many :students 

    def students_per_grades
        students = self.students
        ordered_students = students.sort_by {|s| s.grade}
    end
end
