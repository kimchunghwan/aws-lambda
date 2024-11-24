resource "aws_lambda_function" "api_v1" {
    function_name = "api_v1"
    handler       = "dist/handler.handler"
    runtime       = "nodejs20.x"
    publish       = true

    role          = aws_iam_role.lambda_role.arn
    filename      = "../function.zip" # zip 파일 경로

    source_code_hash = filebase64sha256("../function.zip")
}

resource "aws_lambda_alias" "example_lambda_alias" {
    name             = "live"
    function_name    = aws_lambda_function.api_v1.function_name
    function_version = aws_lambda_function.api_v1.version
}


# resource "aws_lambda_provisioned_concurrency_config" "example_lambda_concurrency" {
#     function_name                     = aws_lambda_function.example_lambda.function_name
#     qualifier                         = aws_lambda_alias.example_lambda_alias.name
#     provisioned_concurrent_executions = 0
# }



