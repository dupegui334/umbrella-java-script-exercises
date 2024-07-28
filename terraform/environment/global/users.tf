resource "aws_iam_user" "ci-cd-user" {
  name = "github-actions"
  tags = {
    area        = "ci-cd"
    responsible = "davidupegui334@hotmail.com"
  }
}

resource "aws_iam_user_policy" "cicd-policy" {
  name = "terraform-cicd-policy"
  user = aws_iam_user.ci-cd-user.name

  policy = jsonencode({
    Version = "2012-10-17"
    "Statement": [
      {
        "Sid": "githubactions",
        "Effect": "Allow",
        "Action": [
          "s3:*"
        ],
        "Resource": [
          "*"
        ]
      }
    ]
  })
}




