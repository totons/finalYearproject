import re

class Token:
    def __init__(self, type, value, line_number):
        self.type = type  # Token type: keyword, identifier, etc.
        self.value = value  # Actual lexeme
        self.line_number = line_number  # Line number of the token

    def __str__(self):
        return f"Token({self.type}, {self.value}, Line {self.line_number})"

class Lexer:
    def __init__(self, filename):
        with open(filename, 'r') as file:
            self.code = file.readlines()
        self.keywords = {"int", "float", "if", "else", "while", "return"}
        self.operators = {"+", "-", "*", "/", "=", "==", "!=", "<", ">", "<=", ">="}  # Add any operators here
        self.separators = {"(", ")", "{", "}", "[", "]", ",", ";", ":"}
        self.tokens = []
        self.current_line = 1

    def tokenize(self):
        for line in self.code:
            self.tokenize_line(line.strip())
            self.current_line += 1
        return self.tokens

    def tokenize_line(self, line):
        # Define token specifications (groupings of token types and regexes)
        token_specification = [
            ("KEYWORD", r'\b(?:' + '|'.join(self.keywords) + r')\b'),
            ("IDENTIFIER", r'\b[a-zA-Z_][a-zA-Z0-9_]*\b'),
            ("OPERATOR", r'|'.join(map(re.escape, self.operators))),
            ("LITERAL", r'\b\d+(\.\d+)?\b'),
            ("SEPARATOR", r'|'.join(map(re.escape, self.separators))),
            ("WHITESPACE", r'[ \t]+'),
            ("COMMENT", r'//.*'),
        ]
        
        # Combine all patterns into a single regex pattern
        token_regex = '|'.join(f'(?P<{name}>{pattern})' for name, pattern in token_specification)
        

        pos = 0  # Track the position in the line
        while pos < len(line):
            match = re.match(token_regex, line[pos:])
            
            if match:
                # If a valid token is found, get its type and value
                token_type = match.lastgroup
                token_value = match.group(token_type)

                if token_type == "WHITESPACE" or token_type == "COMMENT":
                    # Skip whitespace and comments
                    pos += len(token_value)
                elif token_type == "IDENTIFIER" and not self.is_valid_identifier(token_value):
                    # Check if the identifier is valid (not starting with a digit)
                    print(f"Error: Illegal identifier '{token_value}' on line {self.current_line}")
                    pos += len(token_value)
                else:
                    # Add valid tokens to the list
                    self.tokens.append(Token(token_type, token_value, self.current_line))
                    pos += len(token_value)
            else:
                # If no valid token is found, treat this as an invalid token
                print(f"Error: Unrecognized token '{line[pos:]}' on line {self.current_line}")
                pos+=1
              

    def is_valid_identifier(self, identifier):
        # An identifier must not start with a digit
        return not identifier[0].isdigit()

# Example usage
if __name__ == "__main__":
    input_file = "input_program.txt"  # Replace with the path to your input file

    lexer = Lexer(input_file)
    tokens = lexer.tokenize()

    for token in tokens:
        print(token)
