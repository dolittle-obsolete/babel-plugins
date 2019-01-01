export default function ({ types: t }) {
    return {
        visitor: {
            ClassDeclaration(path) {
            },
            VariableDeclaration(path) {
                let declarations = path.node.declarations.filter(_ => _.id.name.indexOf('_proto') >= 0);
                if (declarations && declarations.length > 0) {
                    path.remove();
                }
            },

            ExpressionStatement(path) {

                let expression = path.node.expression;
                if (expression.operator == '=' &&
                    expression.type == 'AssignmentExpression' &&
                    expression.left.type == 'MemberExpression' &&
                    expression.left.object.name &&
                    expression.left.object.name.indexOf('_proto') >= 0) {

                    try {

                        let functionParent = path.getFunctionParent();
                        let className = functionParent.node.body.body[0].id.name;
                        let methodName = expression.right.id.name;
                        expression.left = t.identifier(`${className}.prototype.${methodName}`);
                    } catch (e) {
                        console.log(e);
                    }
                }
            }

        }
    }
}
