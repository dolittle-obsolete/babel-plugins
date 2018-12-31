// https://shuheikagawa.com/blog/2015/09/13/lets-create-a-babel-plugin/
// https://github.com/babel/babel/blob/master/packages/babel-types/src/definitions/core.js
// https://github.com/babel/babel/blob/master/packages/babel-types/src/definitions/es2015.js
// https://github.com/jsdoc2md/jsdoc-parse

import doctrine from 'doctrine';
import traverse from '@babel/traverse';

let nothing = {}; //doctrine.parse("/** */", { unwrap: true });


function getJsDocFrom(path) {

    try {
        if (path.node.leadingComments != null) {

            path.node.leadingComments.forEach(comment => {
                let value = comment.value;
                if (value.indexOf('//') >= 0) return;
                if (value.indexOf('*') == 0) {
                    value = `/*${value} */`;
                    try {
                        let result = doctrine.parse(value, { unwrap: true });
                        console.log(JSON.stringify(result));
                        return result;
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
        }
    } catch (e) {
        console.log(e);
    }


    return nothing;
}


export default function ({ types: t }) {
    return {
        visitor: {
            Program(
                path,
                {
                    file: {
                        ast: { comments },
                    },
                    opts,
                },
            ) {
            },
            Identifier() {

            },
            BlockStatement() {

            },
            ReturnStatement() {

            },
            FunctionDeclaration() {

            },
            FunctionExpression() {

            },
            ArrowFunctionExpression() {

            },
            ExportDeclaration(path) {
                getJsDocFrom(path);
            },
            Class(path) {
                getJsDocFrom(path);
            },
            ClassDeclaration(path) {

            },
            ClassMethod(path) {
                console.log(JSON.stringify(path.node));
                getJsDocFrom(path);
            },
            ClassProperty(path) {
                getJsDocFrom(path);
            },
            ObjectMethod() {
                console.log(JSON.stringify(path.node));
                getJsDocFrom(path);
            },
            FunctionDeclaration(path) {
                getJsDocFrom(path);
            },
            FunctionExpression(path) {
                //console.log(JSON.stringify(path.node));
                getJsDocFrom(path);
            },
            MemberExpression() {

            },

            BinaryExpression(path, state) {
                if (path.node.operator !== "===") {
                    return;
                }

                path.node.left = t.identifier("sebmck");
                path.node.right = t.identifier("dork");
            }
        }
    }
}
