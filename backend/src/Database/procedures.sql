-- Procedure to get delete Project
-- CREATE PROCEDURE deleteProject(@project_id VARCHAR(200))
-- AS
-- BEGIN
--     DELETE FROM projects WHERE project_id = @project_id;
-- END

-- Procedure to assign user project
-- CREATE PROCEDURE assignUserProject( 
--     @user_id VARCHAR(80),
--     @project_id VARCHAR(200)
--     )
-- AS
-- BEGIN
--     UPDATE users
--     SET assigned_project = @project_id
--     WHERE user_id = @user_id;
-- END

-- Procedure to get all projects
-- CREATE PROCEDURE getAllProjects
-- AS
-- BEGIN
--     SELECT  
--     project_id,
--     project_name,
--     project_description,
--     project_status,
--     project_ended_at,
--     user_id,
--     user_first_name,
--     user_last_name
-- FROM 
--     projects
--     INNER JOIN users
--         ON project_id = assigned_project;
-- END

-- Procedure to get all users
-- CREATE PROCEDURE getAllUsers
-- AS
-- BEGIN
--     SELECT user_id, user_role, user_first_name, user_last_name, user_email, assigned_project FROM users WHERE user_role = 'user' AND assigned_project IS NULL;
-- END


-- Procedure to add project
-- CREATE PROCEDURE createProject(
--     @project_id VARCHAR(80),
--     @project_name VARCHAR(50),
--     @project_description VARCHAR(1000),
--     @project_ended_at DATE,
--     @project_status VARCHAR(25)
-- )
-- AS
-- BEGIN
--     INSERT INTO projects
--         (
--         project_id,
--         project_name,
--         project_description,
--         project_ended_at,
--         project_status
--         )
--     VALUES
--         (
--             @project_id,
--             @project_name,
--             @project_description,
--             @project_ended_at,
--             @project_status
--     );
-- END;



-- Procedure to add user
-- CREATE PROCEDURE createUser( 
--     @user_id VARCHAR(80),
--     @user_role VARCHAR(200),
--     @user_first_name VARCHAR(200),
--     @user_last_name VARCHAR(200), 
--     @user_email VARCHAR(200), 
--     @user_password VARCHAR(200),
--     @assigned_project VARCHAR(200)
--     )
-- AS
-- BEGIN
-- INSERT INTO users(user_id,user_role,user_first_name,user_last_name,user_email,user_password,assigned_project) VALUES(@user_id,@user_role,@user_first_name, @user_last_name,@user_email,@user_password,@assigned_project)
-- END



-- Procedure to fetch users
-- CREATE PROCEDURE fetchUser(@user_email VARCHAR(200))
-- AS
-- BEGIN
-- SELECT * FROM users WHERE user_email = @user_email
-- END

-- DROP PROCEDURE getUser;
