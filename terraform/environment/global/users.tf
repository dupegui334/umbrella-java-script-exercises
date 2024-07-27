resource "aws_iam_user" "ci-cd-user" {
  name = "github-actions"
  tags = {
    area        = "ci-cd"
    responsible = "davidupegui334@hotmail.com"
  }
}

