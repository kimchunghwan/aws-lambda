resource "aws_iam_role" "lambda_role" {
  name = "lambda-basic-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_policy" "lambda_invoke_policy" {
  name = "lambda-invoke-policy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action   = "lambda:InvokeFunction",
        Effect   = "Allow",
        Resource = "arn:aws:lambda:ap-northeast-1:044264552816:function:function_01"
      }
    ]
  })
}


resource "aws_iam_policy_attachment" "lambda_execution_policy" {
  name       = "lambda-execution-policy"
  roles      = [aws_iam_role.lambda_role.name]
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_policy_attachment" "lambda_invoke_policy_attachment" {
  name       = "lambda-invoke-policy-attachment"
  roles      = [aws_iam_role.lambda_role.name]
  policy_arn = aws_iam_policy.lambda_invoke_policy.arn
}
